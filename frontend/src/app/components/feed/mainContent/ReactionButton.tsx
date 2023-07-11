"use client";

import React, { useCallback } from "react";
import styled from "styled-components";
import {
  CommentDiscussionIcon,
  HeartFillIcon,
  HeartIcon,
  ShareAndroidIcon,
} from "@primer/octicons-react";
import { Box, StyledOcticon, Text } from "@primer/react";

import { ReactionButtonType } from "@/app/components/feed/mainContent/PostItem";
import { PostPopulated } from "@/types";
import { User } from "@prisma/client";
import useAuthModal from "@/hooks/useAuthModal";

import useShare from "@/hooks/useShare";
import useLike from "@/hooks/useLike";

type Props = {
  selected: ReactionButtonType;
  setSelected: React.Dispatch<React.SetStateAction<ReactionButtonType>>;
  post: PostPopulated;
  currentUser?: User | null;
};

const ReactionButton = ({
  selected,
  setSelected,
  post,
  currentUser,
}: Props) => {
  const authModal = useAuthModal();
  const { hasLiked, toggleLike } = useLike({ post, currentUser });
  const { shareMutation } = useShare({ postId: post.id });

  const handleShare = useCallback(
    async (e: any) => {
      e.stopPropagation();

      setSelected({ ...selected, share: !selected.share });

      if (!selected.share) {
        // await sharePost();
        shareMutation();
      }
    },
    [setSelected, shareMutation, selected.share]
  );

  // Handle like - unlike
  const handleLike = useCallback(
    async (e: any) => {
      e.stopPropagation();

      if (!currentUser) {
        return authModal.onOpen();
      }

      toggleLike();
    },
    [authModal, currentUser, toggleLike]
  );

  return (
    <Box margin="22px 4px 0" display="flex">
      <Box
        display="flex"
        alignItems="center"
        marginRight={10}
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
        onClick={handleLike}
      >
        {hasLiked ? (
          <>
            <StyledOcticon
              icon={HeartFillIcon}
              size={18}
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
                {post.likedIds.length === 0 ? "" : `· ${post.likedIds.length}`}
              </MyText>
            </Text>
          </>
        ) : (
          <>
            <StyledOcticon icon={HeartIcon} size={18} sx={{ mr: "8px" }} />
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
                {post.likedIds.length === 0 ? "" : `· ${post.likedIds.length}`}
              </MyText>
            </Text>
          </>
        )}
      </Box>
      <Box
        display="flex"
        alignItems="center"
        marginRight={10}
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
            size={18}
            sx={{ mr: "8px", color: "canvas.hightlight" }}
          />
        ) : (
          <StyledOcticon
            icon={CommentDiscussionIcon}
            size={18}
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
        onClick={handleShare}
      >
        {selected && selected.share ? (
          <StyledOcticon
            icon={ShareAndroidIcon}
            size={16}
            sx={{ mr: "8px", color: "canvas.hightlight" }}
          />
        ) : (
          <StyledOcticon icon={ShareAndroidIcon} size={16} sx={{ mr: "8px" }} />
        )}
        <Text
          sx={{
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: "600",
          }}
        >
          Share {""}
          {post && post.shares !== 0 && <MyText>{`· ${post.shares}`}</MyText>}
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
