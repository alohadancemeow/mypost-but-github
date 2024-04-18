"use client";

import React, { useCallback, useState } from "react";
import { Avatar, Box, TextInput } from "@primer/react";

import useCreateComment from "@/hooks/useCreateComment";
import { User } from "@clerk/nextjs/dist/types/server";

type Props = {
  currentUser?: User | null;
  postId: string;
};

const CommentInput = ({ currentUser, postId }: Props) => {
  const [commentBody, setCommentBody] = useState<string>("");

  const { createComment } = useCreateComment();

  // # Handle create comment
  const onCreateComment = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        await createComment({ postId, body: commentBody });
        setCommentBody("");
      }
    },
    [createComment, setCommentBody, commentBody]
  );

  return (
    <Box
      display="flex"
      alignItems={"center"}
      justifyContent="flex-start"
      margin="20px 25px"
    >
      <Box>
        <Avatar
          src={`${
            // currentUser?.image ?? 
            "https://github.com/octocat.png"}`}
          size={24}
          alt="@octocat"
        />
      </Box>
      <TextInput
        contrast
        aria-label="text"
        placeholder={
          currentUser?.id === undefined
            ? `Sign in to comment`
            : "Type here..."
        }
        type="text"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        onKeyUp={(e) => {
          onCreateComment(e);
        }}
        disabled={currentUser?.id === undefined}
        sx={{
          bg: "transparent",
          border: "1px solid #444C56",
          width: "100%",
          height: "38px",
          borderRadius: "3px",
          marginInlineStart: "15px",
        }}
      />
    </Box>
  );
};

export default CommentInput;
