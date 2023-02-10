import React from "react";
import { Box } from "@primer/react";

import LoadMore from "./LoadMore";
import PostItem from "./PostItem";
import HeadUnderLine from "./HeadUnderLine";
import PostBanner from "./PostBanner";

type Props = {};

const MainContent = (props: Props) => {
  return (
    <div
      style={{
        position: "-webkit-sticky",
      }}
    >
      <Box
        p={4}
        bg="canvas.primary"
        // color="fg.onEmphasis"
        // border="1px solid red"
        borderLeft="1px solid #636568"
      >
        <PostBanner />
        <HeadUnderLine />
        <PostItem />
        {/* <PostItem />
      <PostItem /> */}
        <LoadMore />
      </Box>
    </div>
  );
};

export default MainContent;
