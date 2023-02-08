import React from "react";

import { Box } from "@primer/react";

import LeftContent from "./LeftContent";
import MainContent from "./MainContent";
import RightContent from "./RightContent";
import Nav from "./Nav";
import Footer from "./Footer";

type Props = {};

const Feed = (props: Props) => {
  return (
    <Box
      bg={"canvas.bg"}
      height={"100vh"}
      display={"flex"}
      flexDirection="column"
      color="white"
    >
      <Nav />
      <Box
        display="grid"
        gridTemplateColumns="1fr 2fr 1fr"
        gridGap={3}
        margin="2rem"
        height="100%"
      >
        <LeftContent />
        <MainContent />
        <RightContent />
      </Box>

      <Footer />
    </Box>
  );
};

export default Feed;
