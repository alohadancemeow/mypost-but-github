import React from "react";
import { Avatar, Box, Text } from "@primer/react";

type Props = {};

const CommentItem = (props: Props) => {
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
            src="https://github.com/octocat.png"
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
          padding="15px"
          sx={{ bg: "#30363E" }}
        >
          <Text fontSize="16px" marginBottom="8px">
            username{" "}
            <span style={{ fontSize: "12px", color: "#ADBAC7" }}>
              · 2.32 PM
            </span>{" "}
          </Text>
          <Text fontSize="12px" color="#ADBAC7">
            Publish your digital garden, docs or any markdown based site easily,
            quickly and elegantly
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default CommentItem;
