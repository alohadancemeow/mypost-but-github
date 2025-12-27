'use client';

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useGetUserList } from "@/hooks/use-get-user-list";
import Link from "next/link";

type ClerkUser = {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    username?: string | null;
    imageUrl?: string | null;
};

const WhoToFollow = () => {
    const [followedByUserId, setFollowedByUserId] = useState<
        Record<string, boolean>
    >({});

    const { user, isLoaded } = useUser();
    const { data: users, isFetching } = useGetUserList();

    const colors = ["#A371F7", "#F78166", "#58A6FF", "#3FB950", "#FFA657", "#D2A8FF"];

    const suggestions = ((users || []) as ClerkUser[])
        .filter((u) => (user?.id ? u.id !== user.id : true))
        .slice(0, 3)
        .map((u, index) => {
            const name =
                `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() ||
                u.username ||
                "User";
            const handle = `@${u.firstName ?? ""}${u.lastName ?? ""}`.trim();
            const initial =
                `${u.firstName?.[0] ?? ""}${u.lastName?.[0] ?? ""}`.trim() ||
                (u.username?.[0] ? u.username[0].toUpperCase() : "U");
            const imageUrl = u.imageUrl || "";

            return {
                id: u.id,
                name,
                handle,
                initial,
                imageUrl,
                color: colors[index % colors.length],
            };
        });

    if (!isLoaded) return null;

    return (
        <section className="mt-10">
            <div className="flex items-center justify-between">
                <h2 className="text-md font-semibold text-white">Who to follow</h2>
                <button
                    type="button"
                    className="text-sm font-medium text-[#58A6FF] hover:underline"
                >
                    View all
                </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                {suggestions.map((user) => {
                    const isFollowing = Boolean(followedByUserId[user.id]);

                    return (
                        <div
                            key={user.id}
                            className="flex items-center justify-between gap-4 rounded-md bg-[#30363E] border border-[#444C56] px-4 py-3"
                        >
                            <Link href={`/user/${user.id}`} className="flex min-w-0 items-center gap-3">
                                {!user.imageUrl ? (
                                    <div
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold text-white"
                                        style={{ backgroundColor: user.color }}
                                    >
                                        {user.initial}
                                    </div>
                                ) : (

                                    <img
                                        className="h-10 w-10 shrink-0 rounded-full"
                                        src={user.imageUrl}
                                        alt={user.name}
                                    />

                                )}

                                <div className="min-w-0">
                                    <div className="truncate text-sm font-semibold text-white">
                                        {user.name}
                                    </div>
                                    <div className="truncate text-xs text-[#8B949E]">
                                        {user.handle}
                                    </div>
                                </div>
                            </Link>

                            <button
                                type="button"
                                className="h-8 shrink-0 rounded-md border border-[#8B949E] bg-[#161B22] px-3 text-sm font-semibold text-[#8B949E] hover:bg-[#262D34] cursor-pointer"
                                disabled={isFetching}
                                onClick={() =>
                                    setFollowedByUserId((prev) => ({
                                        ...prev,
                                        [user.id]: !Boolean(prev[user.id]),
                                    }))
                                }
                            >
                                {isFollowing ? "Unfollow" : "Follow"}
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default WhoToFollow;
