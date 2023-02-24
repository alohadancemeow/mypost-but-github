import React, { useState, useEffect } from "react";
import { Avatar, Box, Text } from "@primer/react";

import ReactionButton from "./ReactionButton";
import Popup from "./Popup";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import Tag from "./Tag";

import { PostPopulated } from "../../../../types/myTypes";

import { formatRelative } from "date-fns";
import enUS from "date-fns/locale/en-US";

import { api as trpc } from "../../../utils/api";
import { Session } from "next-auth";

type Props = {
  session: Session;
  post: PostPopulated;
};

export type ReactionButtonType = {
  like: boolean;
  comment: boolean;
  share: boolean;
};

const formatRelativeLocale = {
  lastWeek: "eeee 'at' p",
  yesterday: "'Yesterday at' p",
  today: "p",
  other: "MM/dd/yy",
};

const PostItem = ({ session, post }: Props) => {
  const [selected, setSelected] = useState<ReactionButtonType>({
    like: false,
    comment: false,
    share: false,
  });
  // console.log("postItem", post);

  // Format date
  const formatedDate = formatRelative(post.createdAt, new Date(), {
    locale: {
      ...enUS,
      formatRelative: (token) =>
        formatRelativeLocale[token as keyof typeof formatRelativeLocale],
    },
  });

  const utils = trpc.useContext();

  // call like - unlike mutation,
  // and update cache
  const { mutateAsync: likeMutation } = trpc.post.like.useMutation({
    onMutate: () => {
      utils.post.getPosts.cancel();
      const postUpdate = utils.post.getPosts.getData();
      if (postUpdate) utils.post.getPosts.setData(undefined, postUpdate);
    },
    onSettled: () => {
      utils.post.getPosts.invalidate();
    },
  });
  const { mutateAsync: unlikeMutation } = trpc.post.unlike.useMutation({
    onMutate: () => {
      utils.post.getPosts.cancel();
      const postUpdate = utils.post.getPosts.getData();
      if (postUpdate) utils.post.getPosts.setData(undefined, postUpdate);
    },
    onSettled: () => {
      utils.post.getPosts.invalidate();
    },
  });

  // Handle like - unlike
  const handleLike = async () => {
    if (!selected.like) {
      const liked = await likeMutation({ postId: post.id });
      console.log("like ation", liked);
    } else {
      unlikeMutation({ postId: post.id });
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
        <Avatar src="https://github.com/octocat.png" size={24} alt="@octocat" />
        <Box display="flex" marginLeft="15px">
          <Text fontSize="16px">
            {post.user?.name}{" "}
            <span style={{ color: "#ADBAC7", padding: "0 3px" }}>posted</span>{" "}
            {post.title}{" "}
            <span style={{ color: "#ADBAC7", padding: "0 3px" }}>
              {`· ${formatedDate}`}
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
            likeCount={post.likes.length}
          />
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
