"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Tag from "../Tag";
import ReactionButton from "./ReactionButton";
import CommentSection from "../comments/CommentSection";
import OptionMenu from "../OptionMenu";

import { PostPopulated } from "@/types";

import { useFormatDate } from "@/hooks/use-format-date";
import { useGetUser } from "@/hooks/use-get-user";
import { useParseContent } from "@/hooks/use-parse-content";

export type ReactionButtonType = {
  comment: boolean;
};

type Props = {
  post: PostPopulated;
  isRanked?: boolean;
  index?: number;
};

const PostItem = ({ post, isRanked, index }: Props) => {
  const [selected, setSelected] = useState<ReactionButtonType>({
    comment: false,
  });

  const { dateFormate } = useFormatDate();
  const { data: user, isFetching } = useGetUser({ userId: post.userId });
  const document = useParseContent(post.body!);

  if (isRanked)
    return (
      <div
        className="mt-2 items-center justify-start flex"
        onClick={() => console.log("card clicked", post.id)}
      >
        <div>
          <div className="h-[30px] bg-transparent items-center flex justify-center w-[30px] rounded-full border border-white">
            <p className="text-[#006EED]">{index ? index + 1 : 1}</p>
          </div>
        </div>
        <div className="flex flex-col ml-4 hover:opacity-70 cursor-pointer border rounded-sm w-full py-2 px-4 border-[#444C56]">
          <div className="flex gap-1">
            <p>{post.title}</p>
          </div>
          <div className="text-xs text-[#ADBAC7] line-clamp-2 text-ellipsis">
            {document}
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col h-fit mt-10">
      <div className="flex items-center justify-start mx-1 mb-4">
        <div>
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage
              src={`${user?.imageUrl}` ?? "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex ml-4">
          <div>
            {`${user?.firstName} ${user?.lastName}`}
            <span className="text-[#ADBAC7] px-1">posted</span> {post.title}{" "}
            <span className="text-[#ADBAC7] px-3">
              {`· ${dateFormate(new Date(post.createdAt))}`}
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-sm w-full h-fit bg-[#30363E] border border-[#444C56]">
        <div className="flex flex-col mx-8 my-5">
          <div className="flex justify-between items-center">
            <div className="text-sm font-semibold mb-[2px]">{post.title}</div>
            <OptionMenu post={post} />
          </div>
          <div>{document}</div>
          <div className="mt-7">
            <Tag text={post.tag ?? ""} />
          </div>
          <ReactionButton
            selected={selected}
            setSelected={setSelected}
            post={post}
          />
        </div>
      </div>

      {selected && selected.comment && <CommentSection post={post} />}
    </div>
  );
};

export default PostItem;
