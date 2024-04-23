"use client";

import styled from "styled-components";
import { Box, CircleBadge, Text } from "@primer/react";

import { useFormatDate } from "@/hooks/use-format-date";
import { PostPopulated } from "@/types";
import { ArrowUpNarrowWide } from "lucide-react";

type Props = {
  popularPosts?: PostPopulated[] | null;
};

const RightContent = ({ popularPosts: posts }: Props) => {
  const { dateFormate } = useFormatDate();

  if (!posts) return <>Loading...</>;

  return (
    <div className="h-full w-full p-10">
      <div className="flex items-center justify-start gap-3 font-semibold">
        <ArrowUpNarrowWide />
        <div className="text-sm">Popular Posts</div>
      </div>

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
              padding="8px 15px"
              sx={{
                cursor: "pointer",
                ":hover": {
                  opacity: 0.7,
                },
              }}
            >
              <Text
                fontSize="16px"
                //  marginBottom="8px"
              >
                {post.title}{" "}
                <span style={{ fontSize: "14px", color: "#ADBAC7" }}>
                  · {dateFormate(post.createdAt)}
                </span>{" "}
              </Text>
              <MyDesc fontSize="12px" color="#ADBAC7">
                {/* <EditorOutput content={post.body} /> */}
                #TODO: EditorOutput
              </MyDesc>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
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
