import axios from "axios";
import { useCallback } from "react";
import { PostPopulated } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

type Props = {
  limit?: number;
};

export const useGetPosts = ({ limit }: Props) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["posts-query"],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        const query = `/api/posts?limit=${limit}&page=${pageParam}`;

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
      // refetchInterval: 1000, // Refetch every 1 second
    });

  const posts = data?.pages.flatMap((page) => page) ?? [];
  // console.log(posts, "posts");

  // handle load more
  const loadNextPost = useCallback(async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage]);

  return { posts, loadNextPost, isFetchingNextPage, hasNextPage, isFetching };
};
