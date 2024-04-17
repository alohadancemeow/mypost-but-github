import React from "react";
import styled from "styled-components";

import { BookIcon } from "@primer/octicons-react";
import { Box, Text } from "@primer/react";

import { useRouter } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";

type Props = {
  currentUser?: User | null;
};

const PostBanner = ({ currentUser }: Props) => {
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

      {currentUser && (
        <button
          className="w-[125px] h-[32px] rounded-sm gap-5 bg-[#006EED]"
          onClick={() => {}}
        >
          Create a post
        </button>
      )}
      {!currentUser && (
        <SignInButton mode="modal">
          <button className="w-[125px] h-[32px] rounded-sm gap-5 bg-[#006EED]">
            Create a post
          </button>
        </SignInButton>
      )}
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
