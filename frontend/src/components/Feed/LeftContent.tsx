import React from "react";

import {
  Avatar,
  Box,
  StyledOcticon,
  Text,
  Heading,
  TextInput,
} from "@primer/react";
import { PeopleIcon } from "@primer/octicons-react";

type Props = {};

const LeftContent = (props: Props) => {
  return (
    <Box
      p={3}
      //   border="1px solid red"
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
        contrast
        aria-label="username"
        name="username"
        placeholder="Find a creator..."
        autoComplete="username"
        sx={{
          bg: "transparent",
          border: "1px solid #444C56",
          width: "244px",
          height: "40px",
          borderRadius: "3px",
        }}
      />
      <Box marginBottom={4} marginTop={4}>
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <Box
              key={index}
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
              onClick={() => console.log("usercard clicked", index)}
            >
              <Avatar
                src="https://github.com/octocat.png"
                size={24}
                alt="@octocat"
              />
              <Box display="flex" flexDirection="column" marginLeft="15px">
                <Text fontSize="16px">{`username-0${index + 1}`} </Text>
                <Text fontSize="12px" color="#006EED">
                  4 posts
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
        Show more
      </Text>
    </Box>
  );
};

export default LeftContent;
