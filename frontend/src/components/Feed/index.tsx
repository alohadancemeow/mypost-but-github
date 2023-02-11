import React from "react";
import styled from "styled-components";

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
      bg="canvas.bg"
      height="fit-content"
      display="flex"
      flexDirection="column"
      color="white"
    >
      <Nav />
      <MyBox
        display="grid"
        gridTemplateColumns="1fr 2.5fr 1fr"
        gridGap={3}
        margin="2rem"
        height="100%"
      >
        <LeftContent />
        <MainContent />
        <RightContent />
      </MyBox>

      <Footer />
    </Box>
  );
};

export default Feed;

// responsive
const MyBox = styled(Box)`
  @media (max-width: 1012px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    margin: 0;
  }
`;
