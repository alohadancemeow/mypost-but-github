'use client'

import React from "react";
import styled from "styled-components";
import { RocketIcon, SignOutIcon } from "@primer/octicons-react";
import { Avatar, Box, Header, StyledOcticon, Text } from "@primer/react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
  session?: Session | null;
};

const Nav = ({ session }: Props) => {
  return (
    <MyHeader
      sx={{
        height: "64px",
        padding: "0 3rem",
        zIndex: '1'
        // border: "1px solid red",
      }}
      
    >
      <Header.Item full>
        <Header.Link
          href="#"
          sx={{ fontSize: "18px", textDecoration: "none", color: "white" }}
        >
          <StyledOcticon icon={RocketIcon} size={24} sx={{ mr: 2 }} />
          <Text fontSize={18} fontWeight={700}>
            Mypost but Github
          </Text>
        </Header.Link>
      </Header.Item>
      <Header.Item sx={{ mr: "0px" }}>
        <Header.Item>
          <MyText fontSize={16} fontWeight={400}>
            Signed in as {session?.user.name}
          </MyText>
        </Header.Item>
        <Avatar
          src={`${session?.user.image ?? "https://github.com/octocat.png"}`}
          size={20}
          alt="@octocat"
        />
        <Box sx={{ cursor: "pointer" }} onClick={() => signOut()}>
          <StyledOcticon
            icon={SignOutIcon}
            size={16}
            sx={{ ml: "20px", cursor: "pointer" }}
          />
        </Box>
      </Header.Item>
    </MyHeader>
  );
};

export default Nav;

// responsive
const MyHeader = styled(Header)`
  @media (max-width: 544px) {
    padding: 0 1rem;

    * {
      font-size: 14px;
    }
  }
`;
const MyText = styled(Text)`
  @media (max-width: 544px) {
    display: none;
  }
`;
