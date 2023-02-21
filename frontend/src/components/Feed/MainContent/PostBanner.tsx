import React from "react";
import styled from "styled-components";

import { BookIcon } from "@primer/octicons-react";
import { Box, Text } from "@primer/react";
import { MyButton } from "../../Auth";

import { api as trpc } from "../../../utils/api";

type Props = {};

const PostBanner = (props: Props) => {
  const { mutateAsync } = trpc.post.createPost.useMutation();

  const onCreatePost = async () => {
    const data = await mutateAsync({
      title: "post101",
      body: "this is post 101",
      tags: ["dev", "js", "next"],
    });
    console.log("onPostCreate", data);
  };

  return (
    <MyBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="250px"
      border="1px solid #444C56"
      sx={{
        borderRadius: "4px",
        // gap: "5px",
        // margin: '20px'
      }}
    >
      <BookIcon size={32} />
      <MyTitle fontSize={24} margin="16px 0 5px">
        Post your idea
      </MyTitle>
      <Text fontSize={14} fontWeight={400} color="#57606A">
        Hope with further education, people can expand their horizons.
      </Text>
      <MyButton
        w="114px"
        h="32px"
        rounded="4px"
        gap="32px 0 0"
        color="#006EED"
        onClick={onCreatePost}
      >
        Create a post
      </MyButton>
    </MyBox>
  );
};

export default PostBanner;

// responsive
const MyBox = styled(Box)`
  @media (max-width: 820px) {
    padding: 15px;
    margin-top: 15px;
  }
`;

const MyTitle = styled(Text)`
  @media (max-width: 544px) {
    font-size: 20px;
  }
`;
