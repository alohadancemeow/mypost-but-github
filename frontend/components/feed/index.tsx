"use client";

import LeftContent from "./LeftContent";
import MainContent from "./mainContent/Main";
import RightContent from "./RightContent";

import { User } from "@clerk/nextjs/dist/types/server";
import { PostPopulated } from "@/types";

type Props = {
  currentUser?: User | null;
  users?: User[] | null;
  popularPosts: PostPopulated[];
};

const Feed = ({ currentUser, users, popularPosts }: Props) => {
  return (
    <div className="h-full w-full flex flex-col text-white">
      <div className="h-full w-full grid grid-cols-3 lg:grid-cols-4">
        <div className="col-span-1">
          <LeftContent users={users} posts={popularPosts} />
        </div>
        <div className="col-span-2">
          <MainContent currentUser={currentUser} />
        </div>
        <div className="col-span-1 hidden lg:flex">
          <RightContent popularPosts={popularPosts} />
        </div>
      </div>
    </div>
  );
};

export default Feed;
