"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ReactionButton from "./ReactionButton";
import Popup from "./Popup";
import Tag from "./Tag";

import { PostPopulated } from "@/types";
import { User } from "@clerk/nextjs/dist/types/server";

import { useFormatDate } from "@/hooks/useFormatDate";
import CommentSection from "./comments/CommentSection";

export type ReactionButtonType = {
  comment: boolean;
  share: boolean;
};

type Props = {
  post: PostPopulated;
};

const PostItem = ({ post }: Props) => {
  const [selected, setSelected] = useState<ReactionButtonType>({
    comment: false,
    share: false,
  });

  const [user, setUser] = useState<User>();

  // make a new parser
  const parser = new DOMParser();
  if (!post.body) return null;
  const document = parser.parseFromString(post.body!, "text/html");

  const { dateFormate } = useFormatDate();

  // fetching post creator
  const fetchUser = async () => {
    axios.get(`/api/user/${post.userId}`).then((res) => {
      if (res.data) {
        setUser(res.data);
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, [post]);

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
      <div className="relative rounded-sm w-full h-fit bg-[#30363E] border border-[#444C56]">
        <div className="flex flex-col mx-8 my-5">
          <div className="text-sm font-semibold mb-[2px]">{post.title}</div>

          {document?.body?.firstChild?.textContent ?? ""}

          <div className="mt-7">
            <Tag text={post.tag ?? ""} />
          </div>
          <ReactionButton
            selected={selected}
            setSelected={setSelected}
            post={post}
          />
          <Popup selected={selected} setSelected={setSelected} />
        </div>
      </div>
      {selected && selected.comment && <CommentSection post={post} />}
    </div>
  );
};

export default PostItem;
