import { Avatar, Box, TextInput } from "@primer/react";
import { Session } from "next-auth";
import React from "react";

type Props = {
  session: Session;
  commentBody: string;
  setCommentBody: React.Dispatch<React.SetStateAction<string>>;
  onCreateComment: () => void;
};

const CommentInput = ({
  session,
  onCreateComment,
  setCommentBody,
  commentBody,
}: Props) => {
  const handleOnCreateComment = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      await onCreateComment();
    }
  };

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
          src={`${session.user.image ?? "https://github.com/octocat.png"}`}
          size={24}
          alt="@octocat"
        />
      </Box>
      <TextInput
        contrast
        aria-label="username"
        // name="username"
        // autoComplete="username"
        placeholder="Type here..."
        type="text"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        onKeyUp={(e) => handleOnCreateComment(e)}
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
