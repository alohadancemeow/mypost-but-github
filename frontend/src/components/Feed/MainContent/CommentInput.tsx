"use client";

import React, { useCallback, useState } from "react";
import { Avatar, Box, TextInput } from "@primer/react";
import { User } from "@prisma/client";

type Props = {
  currentUser?: User | null;
  onCreateComment: (postId: string, commentBody: string) => Promise<void>;
  postId: string;
};

const CommentInput = ({ currentUser, onCreateComment, postId }: Props) => {
  const [commentBody, setCommentBody] = useState<string>("");

  const handleOnCreateComment = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        await onCreateComment(postId, commentBody);
        setCommentBody("");
      }
    },
    [onCreateComment, commentBody, setCommentBody]
  );

  return (
    <Box
      // marginTop={3}
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
        aria-label="username"
        // name="username"
        // autoComplete="username"
        placeholder={
          currentUser?.email === undefined
            ? `Sign in to comment`
            : "Type here..."
        }
        type="text"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        onKeyUp={(e) => {
          handleOnCreateComment(e);
        }}
        disabled={currentUser?.email === undefined}
        sx={{
          bg: "transparent",
          border: "1px solid #444C56",
          width: "100%",
          height: "40px",
          borderRadius: "3px",
          marginInlineStart: "15px",
        }}
      />
    </Box>
  );
};

export default CommentInput;
