import React, { useState } from "react";
import { Avatar, Box, Text } from "@primer/react";

import ReactionButton from "./ReactionButton";
import Popup from "./Popup";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import Tag from "./Tag";

import { PostPopulated } from "../../../../types/myTypes";

type Props = {
  post: PostPopulated;
};

export type ReactionButtonType = {
  like: boolean;
  comment: boolean;
  share: boolean;
};

const PostItem = ({ post }: Props) => {
  const [selected, setSelected] = useState<ReactionButtonType>({
    like: false,
    comment: false,
    share: false,
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      // width={616}
      // height={261}
      height="fit-content"
      marginTop="40px"
      // border="1px solid red"
    >
      <Box
        margin="0 5px 18px"
        display="flex"
        alignItems={"center"}
        justifyContent="flex-start"
      >
        <Avatar src="https://github.com/octocat.png" size={24} alt="@octocat" />
        <Box display="flex" marginLeft="15px">
          <Text fontSize="16px">
            {post.user?.name}{" "}
            <span style={{ color: "#ADBAC7", padding: "0 3px" }}>posted</span>{" "}
            {post.title}{" "}
            <span style={{ color: "#ADBAC7", padding: "0 3px" }}>
              {`· ${post.createdAt}`}
            </span>{" "}
          </Text>
        </Box>
      </Box>
      <Box
        position="relative"
        sx={{
          width: "100%",
          // height: "208px",
          height: "fit-content",
          bg: "#30363E",
          border: "1px solid #444C56",
          borderRadius: "4px",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            margin: "20px 32px",
          }}
        >
          <Text fontSize={14} fontWeight={600} marginBottom={2}>
            {post.title}
          </Text>
          <Text fontSize={14} fontWeight={400} color="#ADBAC7">
            {post.body}
          </Text>
          <Box marginTop={30}>
            {post.tags.map((tag) => (
              <Tag key={tag.id} text={tag.body ?? ""} />
            ))}
          </Box>
          <ReactionButton selected={selected} setSelected={setSelected} />
          <Popup selected={selected} setSelected={setSelected} />
        </Box>
      </Box>
      {selected && selected.comment && (
        <>
          <CommentItem />
          <CommentItem />
          <CommentItem />
          <CommentInput />
        </>
      )}
    </Box>
  );
};

export default PostItem;
