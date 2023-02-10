import React from "react";
import {
  CommentDiscussionIcon,
  HeartFillIcon,
  HeartIcon,
  ShareAndroidIcon,
} from "@primer/octicons-react";
import { Box, StyledOcticon, Text } from "@primer/react";
import { ReactionButtonType } from "./PostItem";

type Props = {
  selected: ReactionButtonType;
  setSelected: React.Dispatch<React.SetStateAction<ReactionButtonType>>;
};

const ReactionButton = ({ selected, setSelected }: Props) => {
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
        onClick={() => setSelected({ ...selected, like: !selected.like })}
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
              Liked · 123
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
              Like · 123
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
          Comment · 123
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
          Share · 123
        </Text>
      </Box>
    </Box>
  );
};

export default ReactionButton;
