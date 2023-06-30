"use client";

import React from "react";
import styled from "styled-components";
import { Box, CircleBadge, Heading, StyledOcticon, Text } from "@primer/react";
import { NumberIcon } from "@primer/octicons-react";

import { trpc } from "../../utils/trpcClient";
import { useFormatDate } from "../../hooks/useFormatDate";

const RightContent = () => {
  const { data: postData } = trpc.post.getPosts.useQuery({
    limit: 5,
    orderBy: "likes",
  });

  const posts = postData?.posts.flatMap((post) => post) ?? [];
  // console.log("posts", posts);

  const { dateFormate } = useFormatDate();

  return (
    <MyBox
      // p={25}
      //  border="1px solid red"

      style={{
        padding: "40px 10px 0px",
      }}
    >
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent="flex-start"
        // marginBottom={3}
        paddingTop={16}
      >
        <StyledOcticon icon={NumberIcon} size={24} sx={{ mr: "10px" }} />
        <Heading sx={{ fontSize: "14px", lineHeight: "20px" }}>
          Popular Posts
        </Heading>
      </Box>

      <Box marginBottom={4} marginTop={4}>
        {posts.map((post, index) => (
          <Box
            key={post.id}
            marginTop={3}
            display="flex"
            alignItems={"center"}
            justifyContent="flex-start"
            onClick={() => console.log("usercard clicked", post.id)}
          >
            <Box>
              <CircleBadge
                size={30}
                sx={{
                  color: "#006EED",
                  bg: "transparent",
                  border: "1px solid white",
                }}
              >
                {index + 1}
              </CircleBadge>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              marginLeft="15px"
              border="1px solid #444C56"
              bg="#30363E"
              borderRadius="4px"
              width="100%"
              padding="10px 15px"
              sx={{
                cursor: "pointer",
                ":hover": {
                  opacity: 0.7,
                },
              }}
            >
              <Text fontSize="16px" marginBottom="8px">
                {post.title}{" "}
                <span style={{ fontSize: "12px", color: "#ADBAC7" }}>
                  · {dateFormate(post.createdAt)}
                </span>{" "}
              </Text>
              <MyDesc fontSize="12px" color="#ADBAC7">
                {post.body}
              </MyDesc>
            </Box>
          </Box>
        ))}
      </Box>
    </MyBox>
  );
};

export default RightContent;

// responsive
const MyBox = styled(Box)`
  @media (max-width: 1200px) {
    display: none;
  }
`;

const MyDesc = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
