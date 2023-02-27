import React, { useState, useEffect } from "react";
import { Avatar, Box, Text } from "@primer/react";

import ReactionButton from "./ReactionButton";
import Popup from "./Popup";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import Tag from "./Tag";

import { PostPopulated } from "../../../../types/myTypes";

import { api as trpc } from "../../../utils/api";
import { Session } from "next-auth";
import { useFormatDate } from "../../../hooks/useFormatDate";

type Props = {
  session: Session;
  post: PostPopulated;
};

export type ReactionButtonType = {
  like: boolean;
  comment: boolean;
  share: boolean;
};

const PostItem = ({ session, post }: Props) => {
  const [selected, setSelected] = useState<ReactionButtonType>({
    like: false,
    comment: false,
    share: false,
  });

  const [commentBody, setCommentBody] = useState<string>("");

  // call a custom hook
  const { dateFormate } = useFormatDate();

  const utils = trpc.useContext();

  // call like - unlike mutation,
  // and update cache
  const { mutateAsync: likeMutation } = trpc.post.like.useMutation({
    onMutate: async () => {
      // await utils.post.getPosts.cancel();
      // const postUpdate = utils.post.getPosts.getData();
      // if (postUpdate) utils.post.getPosts.setData({}, postUpdate);
    },
    onSuccess: async () => {
      await utils.post.getPosts.invalidate();
    },
  });

  const { mutateAsync: unlikeMutation } = trpc.post.unlike.useMutation({
    onMutate: async () => {
      // await utils.post.getPosts.cancel();
      // const postUpdate = utils.post.getPosts.getData();
      // if (postUpdate) utils.post.getPosts.setData({}, postUpdate);
    },
    onSuccess: async () => {
      await utils.post.getPosts.invalidate();
    },
  });

  // Get comments - Create comment
  const { data: commentData } = trpc.comment.getComments.useQuery({
    postId: post.id,
  });

  const { mutateAsync: createComment } = trpc.comment.createComment.useMutation(
    {
      onMutate: async () => {
        // await utils.post.getPosts.cancel();
        // await utils.comment.getComments.cancel();
        // const postUpdate = utils.post.getPosts.getData();
        // const commentUpdate = utils.comment.getComments.getData();
        // if (postUpdate) utils.post.getPosts.setData({}, postUpdate);
        // if (commentUpdate)
        //   utils.comment.getComments.setData({ postId: post.id }, commentUpdate);
      },
      onSuccess: async () => {
        await utils.post.getPosts.invalidate();
        await utils.comment.getComments.invalidate();
      },
    }
  );

  // share increment
  const { mutateAsync: shareMutation } = trpc.post.share.useMutation({
    onMutate: async () => {
      // await utils.post.getPosts.cancel();
      // const postUpdate = utils.post.getPosts.getData();
      // if (postUpdate) utils.post.getPosts.setData({}, postUpdate);
    },
    onSuccess: async () => {
      await utils.post.getPosts.invalidate();
    },
  });

  const onShare = async () => {
    await shareMutation({ postId: post.id });
  };

  // Handle onCreateComment
  const onCreateComment = async () => {
    try {
      await createComment({
        postId: post.id,
        body: commentBody,
      });
    } catch (error) {
      console.log("Failed to create comment", error);
    }

    setCommentBody("");
  };

  // Handle like - unlike
  const handleLike = async () => {
    if (!selected.like) {
      await likeMutation({ postId: post.id });
    } else {
      await unlikeMutation({ postId: post.id });
    }
  };

  // if you've liked, set like -> true
  useEffect(() => {
    const liked = post.likes.some((p) => p.userId === session.user.id);
    if (liked)
      setSelected({
        ...selected,
        like: true,
      });
  }, []);

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
              (post.user && post.user?.image) ??
              "https://github.com/octocat.png"
            }`}
            size={24}
            alt="@octocat"
          />
        </Box>
        <Box display="flex" marginLeft="15px">
          <Text fontSize="16px">
            {post.user?.name}{" "}
            <span style={{ color: "#ADBAC7", padding: "0 3px" }}>posted</span>{" "}
            {post.title}{" "}
            <span style={{ color: "#ADBAC7", padding: "0 3px" }}>
              {`· ${dateFormate(post.createdAt)}`}
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
          <ReactionButton
            selected={selected}
            setSelected={setSelected}
            handleLike={handleLike}
            onShare={onShare}
            post={post}
          />
          <Popup selected={selected} setSelected={setSelected} />
        </Box>
      </Box>
      {selected && selected.comment && (
        <>
          <>
            {commentData &&
              commentData.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
          </>
          <CommentInput
            session={session}
            commentBody={commentBody}
            setCommentBody={setCommentBody}
            onCreateComment={onCreateComment}
          />
        </>
      )}
    </Box>
  );
};

export default PostItem;
