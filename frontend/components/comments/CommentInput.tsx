"use client";

import { useCallback, useState } from "react";
import useCreateComment from "@/hooks/use-create-commnet";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

type Props = {
  postId: string;
};

const CommentInput = ({ postId }: Props) => {
  const [commentBody, setCommentBody] = useState<string>("");

  const { createComment } = useCreateComment();

  const { user } = useUser();

  // # Handle create comment
  const onCreateComment = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        await createComment({ postId, body: commentBody });
        setCommentBody("");
      }
    },
    [createComment, setCommentBody, commentBody]
  );

  return (
    <div className="flex items-center justify-start my-3 mx-6">
      <div>
        <Avatar className="w-[25px] h-[25px]">
          <AvatarImage
            src={`${user?.imageUrl}` ?? "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Input
        aria-label="text"
        placeholder={
          user?.id === undefined ? `Sign in to comment` : "Type here..."
        }
        type="text"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        onKeyUp={(e) => {
          onCreateComment(e);
        }}
        disabled={user?.id === undefined}
        className="bg-transparent h-9 w-full rounded-sm ml-3 border border-[#444C56] focus:border-0"
      />
    </div>
  );
};

export default CommentInput;
