"use client";

import Tabs from "./Tabs";
import Skeleton from "./Skeleton";
import PostItem from "./posts/PostItem";
import LoadMore from "./LoadMore";

import { useGetPosts } from "@/hooks/use-get-posts";

type Props = {
  isProfile?: boolean;
};

const Feed = ({ isProfile }: Props) => {
  const { posts, hasNextPage, isFetchingNextPage, loadNextPost, isFetching } =
    useGetPosts({
      limit: 3,
    });

  return (
    <div>
      {!posts.length && <Skeleton />}
      {posts.map((post) => (
        <PostItem key={post.id} post={post} isProfile={isProfile} />
      ))}

      <LoadMore
        loadNextPost={loadNextPost}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default Feed;
