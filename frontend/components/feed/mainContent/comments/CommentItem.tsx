"use client";

import { Avatar, Box, Text } from "@primer/react";
import { CommentPopulated } from "@/types";
import { useFormatDate } from "@/hooks/useFormatDate";

type Props = {
  comment: CommentPopulated;
};

const CommentItem = ({ comment }: Props) => {
  const { dateFormate } = useFormatDate();
  return (
    <>
      <div
        style={{
          width: "2px",
          height: "18px",
          background: "#444C56",
          marginInlineStart: "6rem",
        }}
      ></div>
      <Box
        // marginTop={3}
        display="flex"
        alignItems={"center"}
        justifyContent="flex-start"
        margin="0 25px"
        height="fit-content"
        // width='100%'
      >
        <Box>
          <Avatar
            src={`${
              // comment.user ?? 
              "https://github.com/octocat.png"} `}
            size={24}
            alt="@octocat"
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          marginLeft="15px"
          border="1px solid #444C56"
          borderRadius="4px"
          width="100%"
          padding="5px 15px"
          sx={{
            bg: "#30363E",
            wordWrap: "break-word",
            wordBreak: "break-all",
          }}
        >
          <Text fontSize="14px" marginBottom="3px">
            {/* {comment.user?.name}{" "} */}
            comment name
            <span style={{ fontSize: "12px", color: "#ADBAC7" }}>
              · {dateFormate(new Date(comment.createdAt))}
            </span>{" "}
          </Text>
          <Text fontSize="12px" color="#ADBAC7">
            {comment.body}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default CommentItem;
