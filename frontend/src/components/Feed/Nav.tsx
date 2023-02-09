import { RocketIcon, SignOutIcon } from "@primer/octicons-react";
import React from "react";
import { Avatar, Box, Header, StyledOcticon, Text } from "@primer/react";

type Props = {};

const Nav = (props: Props) => {
  return (
    <Header
      sx={{
        height: "64px",
        padding: "0 3rem",
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
          <Text fontSize={16} fontWeight={400}>
            Signed in as username
          </Text>
        </Header.Item>
        <Avatar src="https://github.com/octocat.png" size={20} alt="@octocat" />
        <Box sx={{ cursor: "pointer" }} onClick={() => console.log("logout")}>
          <StyledOcticon
            icon={SignOutIcon}
            size={16}
            sx={{ ml: "20px", cursor: "pointer" }}
          />
        </Box>
      </Header.Item>
    </Header>
  );
};

export default Nav;
