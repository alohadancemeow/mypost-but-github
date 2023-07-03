"use client";

import React, { useEffect, useCallback } from "react";
import styled from "styled-components";

import { Box, Text } from "@primer/react";

import LoadMore from "./LoadMore";
import PostItem from "./PostItem";
import HeadUnderLine from "./HeadUnderLine";
import PostBanner from "./PostBanner";
import PostDialog from "./PostDialog";

import { PostInput } from "@/types/myTypes";
import { useIsMutating } from "@tanstack/react-query";
import { postStore } from "@/states/postStore";
import Footer from "../Footer";

import { User } from "@prisma/client";

type Props = {
  currentUser?: User | null;
};

const MainContent = ({ currentUser }: Props) => {
  const setIsOpen = postStore((state) => state.setIsOpen);

  //TODO: Get posts by limit 5
  const posts = new Array(5)

  // const posts = postData?.pages.flatMap((page) => page.posts) ?? [];

  //TODO: Create post

  //TODO:  Create comment

  //TODO: share increment

  const onShare = useCallback(async () => {
    //  share fn
  }, []);

  // Handle onCreateComment
  const onCreateComment = useCallback(
    async (postId: string, commentBody: string) => {
      //
    },
    []
  );

  // handle onCreatePost
  const onCreatePost = useCallback(async (post: PostInput) => {}, []);

  // handle load more
  const loadNextPost = useCallback(async () => {
    // await fetchNextPage();
  }, []);


  return (
    <div
      style={{
        position: "-webkit-sticky",
      }}
    >
      <MyBox
        p={4}
        marginTop={25}
        bg="canvas.primary"
        // color="fg.onEmphasis"
        // border="1px solid red"
        // borderLeft="1px solid #636568"
        borderRadius="8px"
      >
        <PostBanner currentUser={currentUser} />
        <PostDialog
          onCreatePost={onCreatePost}
          isCreatePostLoading={false}
        />
        <HeadUnderLine />

        {/* {isLoading && <Text>Loading posts...</Text>} */}

        {posts &&
          posts?.map((post) => (
            <PostItem
              key={post.id}
              currentUser={currentUser}
              post={post}
              onCreateComment={onCreateComment}
              onShare={onShare}
            />
          ))}
        <LoadMore
          hasNextPage={false}
          isFetching={false}
          loadNextPost={loadNextPost}
        />
      </MyBox>
      <Footer />
    </div>
  );
};

export default MainContent;

// responsive
const MyBox = styled(Box)`
  @media (max-width: 768px) {
    /* border: none; */
  }
  @media (max-width: 544px) {
    padding: 10px;
    margin: 0;
  }
`;
