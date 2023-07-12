"use client";

import React, { useState } from "react";
import styled from "styled-components";

import {
  Avatar,
  Box,
  StyledOcticon,
  Text,
  Heading,
  TextInput,
} from "@primer/react";
import { PeopleIcon } from "@primer/octicons-react";
import { UserWithPost } from "@/types";

type Props = {
  users?: UserWithPost[] | null;
};

const LeftContent = ({ users }: Props) => {
  const [username, setUsername] = useState<string>("");

  // TODO: filtering users by username
  const filteredUser =
    users?.filter((user) =>
      user.name?.toLocaleLowerCase().includes(username.toLowerCase())
    ) ?? users;

  const isLoading = false;

  return (
    <MyBox
      style={{
        position: "-webkit-sticky",
        borderRight: "1px solid #444C56",
        // height: '100vh',
        padding: "40px 25px 25px",
      }}
    >
      <Box
        p={3}
        // border="1px solid red"
        sx={{
          position: "sticky",
          top: "20px",
        }}
      >
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent="flex-start"
          marginBottom={3}
        >
          <StyledOcticon icon={PeopleIcon} size={24} sx={{ mr: "10px" }} />
          <Heading sx={{ fontSize: "14px", lineHeight: "20px" }}>
            All post creators
          </Heading>
        </Box>
        <TextInput
          id="username"
          contrast
          aria-label="username"
          name="username"
          value={username}
          type="text"
          placeholder="Find a creator..."
          autoComplete="username"
          sx={{
            bg: "transparent",
            border: "1px solid #444C56",
            width: "244px",
            height: "40px",
            borderRadius: "3px",
          }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Box marginBottom={4} marginTop={4}>
          {filteredUser &&
            filteredUser?.map((user) => (
              <Box
                key={user.id}
                marginTop={3}
                display="flex"
                alignItems={"center"}
                justifyContent="flex-start"
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    opacity: 0.7,
                  },
                }}
                onClick={() => console.log("usercard clicked", user.id)}
              >
                <Avatar
                  src={`${user.image ?? "https://github.com/octocat.png"}`}
                  size={24}
                  alt="@octocat"
                />
                <Box display="flex" flexDirection="column" marginLeft="15px">
                  <Text fontSize="16px">{user.name} </Text>
                  <Text fontSize="12px" color="#006EED">
                    {`${user.posts.length} posts`}
                  </Text>
                </Box>
              </Box>
            ))}
        </Box>

        <Text
          sx={{
            cursor: "pointer",
            fontSize: "14px",
            ":hover": {
              opacity: 0.7,
            },
          }}
          onClick={() => console.log("show more cliked")}
        >
          {isLoading ? "Loading user..." : "Show more"}
        </Text>
      </Box>
    </MyBox>
  );
};

export default LeftContent;

// fix responsive
const MyBox = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
