"use client";

import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import { Post } from "@prisma/client";

import { PostPopulated } from "@/types";

type Props = {
  post: PostPopulated;
};

const CommentSection = ({ post }: Props) => {
  return (
    <>
      <div>
        {post &&
          post.comments &&
          post.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
      </div>

      <CommentInput postId={post.id} />
    </>
  );
};

export default CommentSection;
