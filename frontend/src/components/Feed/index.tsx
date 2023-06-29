"use client";

import React from "react";
import styled from "styled-components";
import { Session } from "next-auth";

import { Box } from "@primer/react";

import LeftContent from "./LeftContent";
import MainContent from "./MainContent/Main";
import RightContent from "./RightContent";
import { trpc } from "@/utils/trpcClient";

type Props = {
  session?: Session | null;
};

const Feed = ({ session }: Props) => {
  const { data } = trpc.user.getCurrentUser.useQuery();
  console.log("currentUser", data);

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
      <Box display="flex" width="100%">
        <LeftContent />

        <MyBox
          display="grid"
          gridTemplateColumns="3fr 1fr"
          // gridGap={3}
          margin="0 1rem 0"
          height="100%"
          width="100%"
        >
          <MainContent session={session} />
          <RightContent />
        </MyBox>
      </Box>
    </Box>
  );
};

export default Feed;

// responsive
const MyBox = styled(Box)`
  @media (max-width: 1012px) {
    display: grid;
    grid-template-columns: 1fr;
  }
  /* @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    margin: 0;
  } */
`;
