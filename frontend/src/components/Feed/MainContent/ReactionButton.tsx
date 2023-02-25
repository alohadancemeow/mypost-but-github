import React from "react";
import styled from "styled-components";
import {
  CommentDiscussionIcon,
  HeartFillIcon,
  HeartIcon,
  ShareAndroidIcon,
} from "@primer/octicons-react";
import { Box, StyledOcticon, Text } from "@primer/react";

import { ReactionButtonType } from "./PostItem";
import { PostPopulated } from "../../../../types/myTypes";

type Props = {
  selected: ReactionButtonType;
  setSelected: React.Dispatch<React.SetStateAction<ReactionButtonType>>;
  handleLike: () => Promise<void>;
  post: PostPopulated;
};

const ReactionButton = ({ selected, setSelected, handleLike, post }: Props) => {
  return (
    <Box margin="22px 4px 0" display="flex">
      <Box
        display="flex"
        alignItems="center"
        as="button"
        sx={{
          bg: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
          ":hover": {
            opacity: 0.7,
          },
        }}
        onClick={() => {
          setSelected({ ...selected, like: !selected.like });
          handleLike();
        }}
      >
        {selected && selected.like ? (
          <>
            <StyledOcticon
              icon={HeartFillIcon}
              size={24}
              sx={{ mr: "8px", color: "canvas.hightlight" }}
            />
            <Text
              sx={{
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: "600",
              }}
            >
              Liked{" "}
              <MyText>
                {post.likes.length === 0 ? "" : `· ${post.likes.length}`}
              </MyText>
            </Text>
          </>
        ) : (
          <>
            <StyledOcticon icon={HeartIcon} size={24} sx={{ mr: "8px" }} />
            <Text
              sx={{
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: "600",
              }}
            >
              Like{" "}
              <MyText>
                {" "}
                {post.likes.length === 0 ? "" : `· ${post.likes.length}`}
              </MyText>
            </Text>
          </>
        )}
      </Box>
      <Box
        display="flex"
        alignItems="center"
        as="button"
        sx={{
          bg: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
          ":hover": {
            opacity: 0.7,
          },
        }}
        onClick={() => setSelected({ ...selected, comment: !selected.comment })}
      >
        {selected && selected.comment ? (
          <StyledOcticon
            icon={CommentDiscussionIcon}
            size={24}
            sx={{ mr: "8px", color: "canvas.hightlight" }}
          />
        ) : (
          <StyledOcticon
            icon={CommentDiscussionIcon}
            size={24}
            sx={{ mr: "8px" }}
          />
        )}
        <Text
          sx={{
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: "600",
          }}
        >
          Comment{" "}
          <MyText>
            {post.comments.length === 0 ? "" : `· ${post.comments.length}`}
          </MyText>
        </Text>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        as="button"
        sx={{
          bg: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
          ":hover": {
            opacity: 0.7,
          },
        }}
        onClick={() => setSelected({ ...selected, share: !selected.share })}
      >
        {selected && selected.share ? (
          <StyledOcticon
            icon={ShareAndroidIcon}
            size={24}
            sx={{ mr: "8px", color: "canvas.hightlight" }}
          />
        ) : (
          <StyledOcticon icon={ShareAndroidIcon} size={24} sx={{ mr: "8px" }} />
        )}
        <Text
          sx={{
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: "600",
          }}
        >
          Share <MyText>· 123</MyText>
        </Text>
      </Box>
    </Box>
  );
};

export default ReactionButton;

// responsive
const MyText = styled(Text)`
  @media (max-width: 544px) {
    display: none;
  }
`;
