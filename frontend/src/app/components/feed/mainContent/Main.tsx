"use client";

import React, { useCallback } from "react";
import styled from "styled-components";

import { Box } from "@primer/react";

import LoadMore from "@/app/components/feed/mainContent/LoadMore";
import PostItem from "@/app/components/feed/mainContent/PostItem";
import HeadUnderLine from "@/app/components/feed/mainContent/HeadUnderLine";
import PostBanner from "@/app/components/feed/mainContent/PostBanner";

import Footer from "../Footer";

import axios from "axios";
import { User } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PostPopulated } from "@/types";


type Props = {
  currentUser?: User | null;
};

const MainContent = ({ currentUser }: Props) => {

  const {data, fetchNextPage, isFetchingNextPage, hasNextPage, refetch} = useInfiniteQuery({
    queryKey: ['posts-query'],
    queryFn: async ({pageParam = 1}) => {
      const query = `/api/posts?limit=3&page=${pageParam}`
      
      const {data} = await axios.get(query)
      return data as PostPopulated[]
    },
    getNextPageParam: (lastPage, allPages) => {
      // lastPage.nextCursor
      return allPages.length + 1
    },
    initialData: {pages:[], pageParams: [1]},
  })

  const posts = data?.pages.flatMap((page) => page) ?? []
  // console.log(posts, 'posts');


  // handle load more
  const loadNextPost = useCallback(
    async () => {
      if(hasNextPage && !isFetchingNextPage) {
       await fetchNextPage()
      }
    },
    [hasNextPage, isFetchingNextPage]
  );

  // if (posts.length === 0) return <>load post...</>;

  return (
    <div
      style={{
        position: "-webkit-sticky",
      }}
    >
      <MyBox
        p={4}
        marginTop={25}
        bg="canvas.primary"
        // border="1px solid red"
        borderRadius="8px"
      >
        <PostBanner currentUser={currentUser} />
        <HeadUnderLine />

        {posts.length === 0 && <div>loading post...</div>}

        {posts &&
          posts?.map((post) => (
            <PostItem key={post.id} currentUser={currentUser} post={post} />
          ))}
        <LoadMore
          loadNextPost={loadNextPost}
          isFetchingNextPage={isFetchingNextPage} 
          hasNextPage={hasNextPage}
        />
      </MyBox>
      <Footer />
    </div>
  );
};

export default MainContent;

// responsive
const MyBox = styled(Box)`
  @media (max-width: 768px) {
    /* border: none; */
  }
  @media (max-width: 544px) {
    padding: 10px;
    margin: 0;
  }
`;
