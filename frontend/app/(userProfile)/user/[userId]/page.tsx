import MainContentWrapper from "@/components/Wrapper";
import Feed from "@/components/Feed";
import Tabs from "@/components/Tabs";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Mail, Star, UserPlus, Users } from "lucide-react";
import { Suspense } from "react";
import Skeleton from "@/components/Skeleton";
import getUserStars from "@/actions/get-user-stars";

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

const UserProfile = async ({ params }: Props) => {
  const { userId } = await params;
  const stars = await getUserStars(userId);

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const { userId: currentUserId } = await auth();
  const isOwner = currentUserId === userId;

  const displayName =
    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
    user?.username ||
    "User";

  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.trim() ||
    (user?.username?.[0] ? user.username[0].toUpperCase() : "U");

  const joined = new Date(user.createdAt).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });

  const followersCountRaw = user.publicMetadata?.followersCount;
  const followingCountRaw = user.publicMetadata?.followingCount;

  const followersCount =
    typeof followersCountRaw === "number"
      ? followersCountRaw
      : typeof followersCountRaw === "string"
        ? Number.parseInt(followersCountRaw, 10) || 0
        : 0;

  const followingCount =
    typeof followingCountRaw === "number"
      ? followingCountRaw
      : typeof followingCountRaw === "string"
        ? Number.parseInt(followingCountRaw, 10) || 0
        : 0;

  return (
    <>
      <MainContentWrapper>
        <div className="mb-6 overflow-hidden rounded-lg border border-[#30363D] bg-linear-to-b from-[#161B22] to-[#0D1117]">
          <div className="p-4 sm:p-8">
            <div className="flex items-center gap-5 w-full flex-col sm:flex-row">
              {/* avatar */}
              <Avatar className="h-32 w-32 border-4 border-[#0D1117] shadow-sm">
                <AvatarImage src={user?.imageUrl || "https://github.com/shadcn.png"} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>

              {/* metadata */}
              <div className="flex items-center justify-center sm:justify-between sm:pr-8 gap-4 flex-col sm:flex-row pb-4 w-full">
                <div className="flex flex-col">
                  <div className="truncate text-3xl font-bold text-white">{displayName}</div>
                  <div className="truncate text-sm text-[#8B949E]">{`@${user?.firstName ?? ""}${user?.lastName ?? ""}`.trim()}</div>
                  <div className="mt-4 text-sm">
                    <p className="text-[#8B949E]">No bio yet.</p>
                  </div>

                  {/* stats */}
                  <div className="mt-4 flex flex-col gap-2 text-sm text-[#8B949E]">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span className="font-semibold text-[#C9D1D9]">{followersCount}</span>
                        <span>Followers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserPlus size={16} />
                        <span className="font-semibold text-[#C9D1D9]">{followingCount}</span>
                        <span>Following</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={16} />
                        <span className="font-semibold text-[#C9D1D9]">{stars?.starCount}</span>
                        <span>Stars</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span className="text-[#C9D1D9]">Joined {joined}</span>
                    </div>
                  </div>
                </div>

                {/* action */}
                {!isOwner && (
                  <div className="flex gap-3 flex-row sm:flex-col self-start mt-2">
                    <button
                      type="button"
                      className="h-9 sm:px-6 px-4 rounded-md cursor-pointer bg-green-600 hover:bg-green-500 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1117] flex items-center gap-2"
                    >
                      <UserPlus size={16} />
                      Follow
                    </button>
                    <a
                      href={`mailto:${user.emailAddresses[0]?.emailAddress}`}
                      className="h-9 sm:px-6 px-4 rounded-md cursor-pointer border border-[#30363D] bg-[#161B22] text-sm font-semibold text-[#C9D1D9] hover:bg-[#262D34] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58A6FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1117] flex items-center gap-2"
                    >
                      <Mail size={16} />
                      Message
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          firstTab="Overview"
          secondTab="Stared"
          isProfile
          owner={userId}
        />
        <Suspense fallback={<Skeleton />}>
          <Feed isProfile userId={userId} />
        </Suspense>
      </MainContentWrapper>
    </>
  );
};

export default UserProfile;
