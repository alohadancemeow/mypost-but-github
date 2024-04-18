"use client";

import { SignInButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import { BookOpenText } from "lucide-react";
import usePostModal from "@/hooks/usePostModal";

type Props = {
  currentUser?: User | null;
};

const PostBanner = ({ currentUser }: Props) => {
  const postModal = usePostModal();

  return (
    <div className="flex items-center rounded-sm justify-center flex-col py-10 border border-[#444C56]">
      <BookOpenText size={40} />
      <div className="text-2xl mt-4 mx-1">Post your idea</div>
      <p className="m-3 text-center pb-5">
        Hope with further education, people can expand their horizons.
      </p>

      {currentUser && (
        <button
          className="w-[125px] h-[32px] rounded-sm gap-5 bg-[#006EED] hover:bg-sky-700"
          onClick={() => postModal.onOpen()}
        >
          Create a post
        </button>
      )}
      {!currentUser && (
        <SignInButton mode="modal">
          <button className="w-[125px] h-[32px] rounded-sm gap-5 bg-[#006EED] hover:bg-sky-700">
            Create a post
          </button>
        </SignInButton>
      )}
    </div>
  );
};

export default PostBanner;
