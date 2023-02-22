import React, { useState } from "react";
import styled from "styled-components";

import { Box } from "@primer/react";

import LoadMore from "./LoadMore";
import PostItem from "./PostItem";
import HeadUnderLine from "./HeadUnderLine";
import PostBanner from "./PostBanner";
import PostDialog from "./PostDialog";

import { api as trpc } from "../../../utils/api";

import { PostInput } from "../../../../types/myTypes";

type Props = {};

const MainContent = (props: Props) => {
  const { data: postData } = trpc.post.getPosts.useQuery();
  // console.log("postData", postData);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const utils = trpc.useContext();

  const { mutateAsync } = trpc.post.createPost.useMutation({
    onMutate: () => {
      // cancel query
      utils.post.getPosts.cancel();
      utils.user.getUsers.cancel();

      // get updated data
      const userUpdate = utils.user.getUsers.getData();
      const postUpdate = utils.post.getPosts.getData();

      // set updated date
      if (userUpdate) utils.user.getUsers.setData(undefined, userUpdate);
      if (postUpdate) utils.post.getPosts.setData(undefined, postUpdate);
    },
    onSettled: () => {
      // invalidate old data
      utils.post.getPosts.invalidate();
      utils.user.getUsers.invalidate();
    },
  });

  // handle onCreatePost
  const onCreatePost = async (post: PostInput) => {
    // console.log("onCreatepost", post);

    const data = await mutateAsync({
      title: post.title,
      body: post.body,
      tags: post.tags.map((p) => p.text),
    });

    if (data) setIsOpen(false);
  };

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
      >
        <PostBanner setIsOpen={setIsOpen} />
        <PostDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onCreatePost={onCreatePost}
        />
        <HeadUnderLine />

        {postData &&
          postData.map((post) => <PostItem key={post.id} post={post} />)}
        <LoadMore />
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
