"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Comment } from "@prisma/client";
import { useGetUser } from "@/hooks/use-get-user";
import { formatDistanceToNow } from "date-fns";
import { PostPopulated } from "@/types";
import OptionMenu from "../OptionMenu";
import { useUser } from "@clerk/nextjs";

type Props = {
  comment: Comment;
  post: PostPopulated;
};

const CommentItem = ({ comment, post }: Props) => {
  const { data: user, isFetching } = useGetUser({ userId: comment.userId });

  const { user: currentUser, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <div className="mx-6">
      <div className="w-0.5 h-3 bg-[#444C56] ms-24" />
      <div className="flex items-center justify-start h-fit">
        <Avatar className="w-6.25 h-6.25">
          <AvatarImage
            src={user?.imageUrl ?? "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex bg-[#30363E] w-full py-1 px-3 flex-col ml-4 border border-[#444C56] rounded-sm">
          <div className="flex justify-between w-full gap-1">
            <div className="mb-1 flex gap-1 text-[#ADBAC7] text-xs">
              <div className="">{`${user?.firstName} ${user?.lastName}`}</div>
              <span className="text-[#8B949E]">· {formatDistanceToNow(new Date(comment.createdAt))} ago</span>
            </div>
            {currentUser?.id === comment.userId && (
              <div>
                <OptionMenu post={post} commentId={comment.id} />
              </div>
            )}
          </div>
          <p className="text-xs wrap-break-word break-all">{comment.body}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
