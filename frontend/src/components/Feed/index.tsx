"use client";

import React from "react";
import styled from "styled-components";

import { Box } from "@primer/react";

import LeftContent from "./LeftContent";
import MainContent from "./MainContent/Main";
import RightContent from "./RightContent";
import { trpc } from "@/utils/trpcClient";

type Props = {};

const Feed = ({}: Props) => {
  const { data: currentUser } = trpc.user.getCurrentUser.useQuery();
  // console.log("currentUser", data);

  return (
    <Box
      bg="canvas.primary"
      height="100vh"
      width="100%"
      display="flex"
      flexDirection="column"
      color="white"
      // opacity='0.99'
    >
      <LayoutBox display="flex" width="100%" padding="0 2.5rem">
        <LeftContent />

        <MyBox
          display="grid"
          gridTemplateColumns="2fr 1fr"
          // gridGap={3}
          margin="0 1rem 0"
          height="100%"
          width="100%"
        >
          <MainContent currentUser={currentUser} />
          <RightContent />
        </MyBox>
      </LayoutBox>
    </Box>
  );
};

export default Feed;

// responsive
const MyBox = styled(Box)`
  @media (max-width: 1200px) {
    display: grid;
    grid-template-columns: 1fr;
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    margin: 0;
    padding: 0;
  }
`;

const LayoutBox = styled(Box)`
  @media (max-width: 768px) {
    margin: 0;
    padding: 10px;
  }
`;
