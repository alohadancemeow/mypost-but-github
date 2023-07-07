"use client";

import React from "react";
import styled from "styled-components";

import { Box } from "@primer/react";

import LeftContent from "./LeftContent";
import MainContent from "./MainContent/Main";
import RightContent from "./RightContent";
import { User } from "@prisma/client";
import { PostPopulated, UserWithPost } from "@/types";

type Props = {
  currentUser?: User | null;
  users?: UserWithPost[] | null;
  popularPosts?: PostPopulated[] | null
};

const Feed = ({ currentUser, users, popularPosts }: Props) => {
  return (
    <Box
      bg="canvas.primary"
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
      color="white"
      // opacity='0.99'
    >
      <LayoutBox display="flex" width="100%" padding="0 2.5rem">
        <LeftContent users={users} />

        <MyBox
          display="grid"
          gridTemplateColumns="2fr 1fr"
          // gridGap={3}
          margin="0 1rem 0"
          height="100%"
          width="100%"
        >
          <MainContent currentUser={currentUser} />
          <RightContent popularPosts={popularPosts}/>
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
