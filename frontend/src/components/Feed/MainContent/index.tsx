import React from "react";
import { Box } from "@primer/react";

import LoadMore from "./LoadMore";
import PostItem from "./PostItem";
import HeadUnderLine from "./HeadUnderLine";
import PostBanner from "./PostBanner";
import styled from "styled-components";

import { api as trpc } from "../../../utils/api";

type Props = {};

const MainContent = (props: Props) => {
  const { data: postData } = trpc.post.getPosts.useQuery();
  console.log("postData", postData);

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
        <PostBanner />
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
