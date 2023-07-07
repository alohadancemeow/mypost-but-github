'use client'

import CommentItem from "@/app/components/feed/mainContent/CommentItem";
import CommentInput from "@/app/components/feed/mainContent/CommentInput";

import {  User } from "@prisma/client";
import {  PostPopulated } from "@/types";

type Props = {
  currentUser?: User | null;
  post: PostPopulated;
};

const CommentSection =  ({  post, currentUser }: Props) => {
  return (
    <>
      <>
        {post.comments &&
          post.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
      </>

      <CommentInput currentUser={currentUser} postId={post.id} />
    </>
  );
};

export default CommentSection;
