"use client";

import { Rocket, Search } from "lucide-react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

const Nav = (props: Props) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  if (!isLoaded) return null;

  return (
    <div className="h-16.25 mb-12 border-b border-[#30363D] flex justify-between items-center px-5 md:px-0 gap-2 ">
      <div
        className="text-lg text-white cursor-pointer flex items-center gap-2"
        onClick={() => router.push("/")}
      >
        <Rocket size={20} />
        <div className="text-md font-semibold hidden md:block">Mypost but Github</div>
      </div>

      {/* search bar */}
      <div className="w-full max-w-xs md:max-w-md h-9 rounded-md bg-[#0D1117] border border-[#30363D] flex items-center gap-2 px-3 focus-within:border-[#58A6FF]">
        <Search size={16} className="shrink-0 text-[#8B949E]" />
        <input
          type="text"
          aria-label="Search"
          className="flex-1 min-w-0 h-full bg-transparent text-sm text-[#C9D1D9] placeholder:text-[#8B949E] outline-none"
          placeholder="Search users, posts..."
        />
        <kbd className="shrink-0 px-2 py-0.5 text-xs text-[#8B949E] bg-[#161B22] border border-[#30363D] rounded-sm">
          /
        </kbd>
      </div>

      <div className="flex items-center text-white gap-3 ">
        {user && (
          <Link href={`/user/${user.id}`} className="text-sm font-medium hidden sm:block">
            {`${user.fullName ?? user.primaryEmailAddress}`}
          </Link>
        )}

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button
              className="w-32.5 h-8 cursor-pointer rounded-md bg-[#238636] text-white font-semibold"
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
