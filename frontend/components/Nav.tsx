"use client";

import { Rocket } from "lucide-react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import { useRouter } from "next/navigation";

type Props = {};

const Nav = (props: Props) => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="h-[65px] border-b-[#444C56] border-b-[1px] flex justify-between items-center">
      <div
        className="text-lg text-white cursor-pointer flex items-center gap-2 pl-16"
        onClick={() => router.push("/")}
      >
        <Rocket size={24} />
        <div className="text-lg font-semibold">Mypost but Github</div>
      </div>

      <div className="flex items-center text-white gap-3 pr-16">
        {user && (
          <div className="text-sm font-medium">
            {`${user.fullName ?? user.primaryEmailAddress}`}
          </div>
        )}

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button
              className="w-[130px] h-[32px] rounded-sm"
              onClick={() => {}}
            >
              Join Us ✌️🎉
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default Nav;
