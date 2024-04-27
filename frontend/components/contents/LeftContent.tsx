"use client";

import { useState } from "react";

import { User } from "@clerk/nextjs/dist/types/server";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import usePostCount from "@/hooks/use-post-count";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@prisma/client";

type Props = {
  users?: User[] | null;
  posts: Post[];
};

const LeftContent = ({ users, posts }: Props) => {
  const [username, setUsername] = useState<string>("");

  const router = useRouter();
  const { userPostCount } = usePostCount({ posts });

  const filteredUser =
    users?.filter((user) =>
      user.firstName
        ?.concat(user.lastName!)
        ?.toLocaleLowerCase()
        .includes(username.toLowerCase())
    ) ?? users;

  const isLoading = false;

  return (
    <div className="h-full w-full p-10 lg:max-w-sm">
      <div className="sticky top-10 z-50">
        <div className="flex items-center justify-start mb-3 gap-3">
          <Users size={20} />
          <div className="text-sm font-semibold">All post creators</div>
        </div>
        <input
          id="username"
          aria-label="username"
          name="username"
          value={username}
          type="text"
          placeholder="Find a creator..."
          autoComplete="none"
          className=" text-black autofill:none placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 p-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="my-8">
          {filteredUser &&
            filteredUser?.map((user) => (
              <div
                className="flex items-center gap-3 justify-start cursor-pointer mt-3 p-2 hover:bg-gray-700 rounded-sm"
                key={user.id}
                onClick={() => router.push(`/user/${user.id}`)}
              >
                <Avatar>
                  <AvatarImage
                    className=""
                    src={`${user.imageUrl ?? "https://github.com/octocat.png"}`}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col mr-4">
                  <div className="text-sm">
                    {`${user.firstName} ${user.lastName}`}{" "}
                  </div>
                  <div className="text-sm text-[#006EED]">
                    {`${userPostCount[user.id] || 0} posts`}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div
          className="cursor-pointer text-sm hover:text-opacity-15"
          onClick={() => console.log("show more cliked")}
        >
          {isLoading ? "Loading user..." : "Show more"}
        </div>
      </div>
    </div>
  );
};

export default LeftContent;
