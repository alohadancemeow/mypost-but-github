"use client";

import React, {  useState } from "react";
import { Avatar, Box, Text } from "@primer/react";

import ReactionButton from "./ReactionButton";
import Popup from "./Popup";
import Tag from "./Tag";

import { PostPopulated } from "@/types";

import { useFormatDate } from "@/hooks/useFormatDate";
import EditorOutput from "@/components/editor/EditorOutput";
import CommentSection from "./CommentSection";
import { User } from "@clerk/nextjs/dist/types/server";

export type ReactionButtonType = {
  comment: boolean;
  share: boolean;
};

type Props = {
  currentUser?: User | null;
  post: PostPopulated;
};

const PostItem = ({ currentUser, post }: Props) => {
  const [selected, setSelected] = useState<ReactionButtonType>({
    comment: false,
    share: false,
  });

  const { dateFormate } = useFormatDate();

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
        <Box>
          <Avatar
            src={`${
              // (post.user && post.user?.image) ??
              "https://github.com/octocat.png"
            }`}
            size={24}
            alt="@octocat"
          />
        </Box>
        <Box display="flex" marginLeft="15px">
          <Text fontSize="16px">
            {/* {post.user?.name}{" "} */}
            username
            <span style={{ color: "#ADBAC7", padding: "0 3px" }}>posted</span>{" "}
            {post.title}{" "}
            <span style={{ color: "#ADBAC7", padding: "0 3px" }}>
              {`· ${dateFormate(new Date(post.createdAt))}`}
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

          <EditorOutput content={post.body} />

          <Box marginTop={30}>
            {post?.tags?.map((tag, index) => (
              <Tag key={index} text={tag ?? ""} />
            ))}
          </Box>
          <ReactionButton
            selected={selected}
            setSelected={setSelected}
            post={post}
            currentUser={currentUser}
          />
          <Popup selected={selected} setSelected={setSelected} />
        </Box>
      </Box>
      {selected && selected.comment && (
          <CommentSection currentUser={currentUser} post={post} />
      )}
    </Box>
  );
};

export default PostItem;
