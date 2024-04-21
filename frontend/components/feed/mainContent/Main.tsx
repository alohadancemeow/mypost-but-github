"use client";

import LoadMore from "./LoadMore";
import PostItem from "./posts/PostItem";
import Tabs from "./Tabs";
import PostBanner from "./PostBanner";
import Footer from "../Footer";
import Skeleton from "./Skeleton";

import { useGetPosts } from "@/hooks/use-get-posts";

type Props = {};

const MainContent = (props: Props) => {
  const { posts, hasNextPage, isFetchingNextPage, loadNextPost, isFetching } =
    useGetPosts({
      limit: 3,
    });

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

        {!posts.length && <Skeleton />}
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}

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
