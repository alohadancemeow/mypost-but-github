'use client';

import { useState } from "react";

const WhoToFollow = () => {
    const [followedByHandle, setFollowedByHandle] = useState<
        Record<string, boolean>
    >({});

    const suggestions = [
        {
            name: "Rust Foundation",
            handle: "@rustlang",
            initial: "R",
            color: "#A371F7",
        },
        {
            name: "Y Combinator",
            handle: "@ycombinator",
            initial: "Y",
            color: "#F78166",
        },
        {
            name: "Tailwind Labs",
            handle: "@tailwindcss",
            initial: "T",
            color: "#58A6FF",
        },
    ];

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
                    const isFollowing = Boolean(followedByHandle[user.handle]);

                    return (
                        <div
                            key={user.handle}
                            className="flex items-center justify-between gap-4 rounded-md bg-[#30363E] border border-[#444C56] px-4 py-3"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <div
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold text-white"
                                    style={{ backgroundColor: user.color }}
                                >
                                    {user.initial}
                                </div>

                                <div className="min-w-0">
                                    <div className="truncate text-sm font-semibold text-white">
                                        {user.name}
                                    </div>
                                    <div className="truncate text-xs text-[#8B949E]">
                                        {user.handle}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="h-8 shrink-0 rounded-md border border-[#8B949E] bg-[#161B22] px-3 text-sm font-semibold text-[#8B949E] hover:bg-[#262D34] cursor-pointer"
                                onClick={() =>
                                    setFollowedByHandle((prev) => ({
                                        ...prev,
                                        [user.handle]: !Boolean(prev[user.handle]),
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
