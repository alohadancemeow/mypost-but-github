"use client";

import React from "react";
import { Avatar, Box, Text } from "@primer/react";
import { CommentPopulated } from "../../../types/myTypes";
import { useFormatDate } from "../../../hooks/useFormatDate";

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
          height: "30px",
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
      >
        <Box>
          <Avatar
            src={`${comment.user?.image ?? "https://github.com/octocat.png"} `}
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
          padding="15px"
          sx={{ bg: "#30363E" }}
        >
          <Text fontSize="16px" marginBottom="8px">
            {comment.user?.name}{" "}
            <span style={{ fontSize: "12px", color: "#ADBAC7" }}>
              · {dateFormate(comment.createdAt)}
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
