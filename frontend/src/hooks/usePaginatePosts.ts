import useSWRInfinite from "swr/infinite";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const usePaginatePosts = () => {
  const PAGE_LIMIT = 2;

  const getKey = (pageIndex: number, previousPageData: any) => {
    // reached the end
    if (previousPageData && !previousPageData.data) return null;

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) return `/api/posts?limit=${PAGE_LIMIT}`;

    // add the cursor to the API endpoint
    return `/api/posts?cursor=${previousPageData.nextCursor}&limit=${PAGE_LIMIT}`;
  };

  const { data, error, setSize, size } = useSWRInfinite(getKey, fetcher);

  const paginatePosts = data?.flat();

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT);

  return { paginatePosts, isLoadingMore, isReachingEnd, setSize, error, size };
};
