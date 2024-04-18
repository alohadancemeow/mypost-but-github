'use client'

import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";

import {  PostPopulated } from "@/types";
import { User } from "@clerk/nextjs/dist/types/server";

type Props = {
  currentUser?: User | null;
  post: any;
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
