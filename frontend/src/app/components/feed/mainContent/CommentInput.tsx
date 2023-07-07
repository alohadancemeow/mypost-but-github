"use client";

import React, { useCallback, useState } from "react";
import { Avatar, Box, TextInput } from "@primer/react";
import { User } from "@prisma/client";

import useComment from "@/hooks/useComment";

type Props = {
  currentUser?: User | null;
  postId: string;
};

const CommentInput = ({ currentUser, postId }: Props) => {
  const [commentBody, setCommentBody] = useState<string>("");

  const { createComment} = useComment({ postId, body: commentBody });
  

  // # Handle create comment
  const onCreateComment = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        await createComment();
        setCommentBody("");
      }
    },
    [createComment, setCommentBody]
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
          src={`${currentUser?.image ?? "https://github.com/octocat.png"}`}
          size={24}
          alt="@octocat"
        />
      </Box>
      <TextInput
        contrast
        aria-label="text"
        placeholder={
          currentUser?.email === undefined
            ? `Sign in to comment`
            : "Type here..."
        }
        type="text"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        onKeyUp={(e) => {
          onCreateComment(e);
        }}
        disabled={currentUser?.email === undefined}
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
