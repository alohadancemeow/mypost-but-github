import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import { Box } from "@primer/react";

import LoadMore from "./LoadMore";
import PostItem from "./PostItem";
import HeadUnderLine from "./HeadUnderLine";
import PostBanner from "./PostBanner";
import PostDialog from "./PostDialog";

import { api as trpc } from "../../../utils/api";

import { PostInput } from "../../../../types/myTypes";
import { Session } from "next-auth";
import { useIsMutating } from "@tanstack/react-query";

type Props = {
  session: Session;
};

const MainContent = ({ session }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const utils = trpc.useContext();

  // Get posts
  const {
    data: postData,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = trpc.post.getPosts.useInfiniteQuery(
    { limit: 5 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  const posts = postData?.pages.flatMap((page) => page.posts) ?? [];

  // Create post
  const { mutateAsync } = trpc.post.createPost.useMutation({
    onMutate: async () => {
      // cancel query
      await utils.user.getUsers.cancel();
      await utils.post.getPosts.cancel();

      // get updated data
      const userUpdate = utils.user.getUsers.getData();
      const postUpdate = utils.post.getPosts.getData();

      // set updated date
      if (userUpdate) utils.user.getUsers.setData(undefined, userUpdate);
      if (postUpdate) utils.post.getPosts.setData({}, postUpdate);
    },
  });

  // Create comment
  const { mutateAsync: createComment } = trpc.comment.createComment.useMutation(
    {
      onMutate: async ({ postId }) => {
        await utils.post.getPosts.cancel();
        await utils.comment.getComments.cancel();

        const postUpdate = utils.post.getPosts.getData();
        const commentUpdate = utils.comment.getComments.getData();

        if (postUpdate) utils.post.getPosts.setData({}, postUpdate);
        if (commentUpdate)
          utils.comment.getComments.setData({ postId }, [...commentUpdate]);
      },
    }
  );

  // share increment
  const { mutateAsync: shareMutation } = trpc.post.share.useMutation({
    onMutate: async () => {
      await utils.post.getPosts.cancel();
      const postUpdate = utils.post.getPosts.getData();
      if (postUpdate) utils.post.getPosts.setData({}, postUpdate);
    },
  });

  const onShare = useCallback(
    async (postId: string) => {
      await shareMutation({ postId });
    },
    [shareMutation]
  );

  // Handle onCreateComment
  const onCreateComment = useCallback(
    async (postId: string, commentBody: string) => {
      try {
        await createComment({
          postId,
          body: commentBody,
        });
      } catch (error) {
        console.log("Failed to create comment", error);
      }
    },
    [createComment]
  );

  // handle onCreatePost
  const onCreatePost = useCallback(
    async (post: PostInput) => {
      try {
        await mutateAsync({
          title: post.title,
          body: post.body,
          tags: post.tags.map((p) => p.text),
        });

        setIsOpen(false);
      } catch (error) {
        console.log("Failed to create post", error);
      }
    },
    [mutateAsync]
  );

  // handle load more
  const loadNextPost = useCallback(async () => {
    await fetchNextPage();
  }, [fetchNextPage]);

  const number = useIsMutating();
  // invalidate queries when mutations have settled
  // doing this here rather than in `onSettled()`
  // to avoid race conditions if you're clicking fast
  useEffect(() => {
    if (number === 0) {
      // refetches posts after a post is added
      utils.user.getUsers.invalidate();
      utils.post.getPosts.invalidate();
      utils.comment.getComments.invalidate();
    }
  }, [number, utils]);

  return (
    <div
      style={{
        position: "-webkit-sticky",
      }}
    >
      <MyBox
        p={4}
        bg="canvas.primary"
        // color="fg.onEmphasis"
        // border="1px solid red"
        borderLeft="1px solid #636568"
        borderRadius="8px"
      >
        <PostBanner setIsOpen={setIsOpen} />
        <PostDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onCreatePost={onCreatePost}
        />
        <HeadUnderLine />

        {posts &&
          posts.map((post) => (
            <PostItem
              key={post.id}
              session={session}
              post={post}
              onCreateComment={onCreateComment}
              onShare={onShare}
            />
          ))}
        <LoadMore
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          loadNextPost={loadNextPost}
        />
      </MyBox>
    </div>
  );
};

export default MainContent;

// responsive
const MyBox = styled(Box)`
  @media (max-width: 768px) {
    border: none;
  }
  @media (max-width: 544px) {
    padding: 10px;
  }
`;
