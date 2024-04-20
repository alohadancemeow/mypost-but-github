"use client";

import axios from "axios";
import { useCallback } from "react";

import LoadMore from "./LoadMore";
import PostItem from "./PostItem";
import Tabs from "./Tabs";
import PostBanner from "./PostBanner";

import Footer from "../Footer";

import { useInfiniteQuery } from "@tanstack/react-query";
import { PostPopulated } from "@/types";
import Skeleton from "./Skeleton";

type Props = {};

const MainContent = (props: Props) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["posts-query"],
      queryFn: async ({ pageParam = 1 }) => {
        const query = `/api/posts?limit=3&page=${pageParam}`;

        const { data } = await axios.get(query);
        return data as PostPopulated[];
      },
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage || lastPage.length === 0) {
          return null;
        }
        return allPages.length + 1;
      },
      initialData: { pages: [], pageParams: [1] },
    });

  const posts = data?.pages.flatMap((page) => page) ?? [];
  // console.log(posts, 'posts');

  // handle load more
  const loadNextPost = useCallback(async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage]);

  // if (posts.length === 0) return <>load post...</>;

  return (
    <div
      style={{
        position: "-webkit-sticky",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className="rounded-sm p-10">
        <PostBanner />
        <Tabs />

        {posts.length === 0 && <Skeleton />}
        {posts && posts?.map((post) => <PostItem key={post.id} post={post} />)}

        <LoadMore
          loadNextPost={loadNextPost}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      </div>
      <Footer />
    </div>
  );
};

export default MainContent;
