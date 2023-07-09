import useSWRInfinite from "swr/infinite";

/**
 * @example link: https://www.ibrahima-ndaw.com/blog/data-fetching-in-nextjs-using-useswr/
 * @SWR docs: https://swr.vercel.app/docs/pagination
 */

const fetcher = (url: string) => fetch(url, {
  cache: 'no-cache',
  next: {
    tags: ['posts']
  }
}).then((res) => res.json());

export const usePaginatePosts = (url: string) => {
  const PAGE_LIMIT = 3;

  const getKey = (pageIndex: number, previousPageData: any) => {
    pageIndex = pageIndex + 1;

    // reached the end
    if (previousPageData && !previousPageData.data) return null;

    // first page, we don't have `previousPageData`
    // if (pageIndex === 0) return `/api/posts?limit=${PAGE_LIMIT}`;

    // add the cursor to the API endpoint
    // return `/api/posts?cursor=${previousPageData.nextCursor}&limit=${PAGE_LIMIT}`;

    return `${url}?page=${pageIndex}&limit=${PAGE_LIMIT}`;
  };

  const { data, error, setSize, size } = useSWRInfinite(getKey, fetcher, {
    parallel: true,
  });

  const paginateData = data?.flat();

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT);

  return {
    paginateData,
    isLoadingMore,
    isReachingEnd,
    setSize,
    error,
    size,
  };
};
