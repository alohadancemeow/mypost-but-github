import { Avatar, Box, TextInput } from "@primer/react";
import React from "react";

type Props = {};

const CommentInput = (props: Props) => {
  return (
    <Box
      // marginTop={3}
      display="flex"
      alignItems={"center"}
      justifyContent="flex-start"
      margin="20px 25px"
    >
      <Box>
        <Avatar src="https://github.com/octocat.png" size={24} alt="@octocat" />
      </Box>
      <TextInput
        contrast
        aria-label="username"
        // name="username"
        // autoComplete="username"
        placeholder="Type here..."
        type="text"
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
