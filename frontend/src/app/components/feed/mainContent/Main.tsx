"use client";

import React, { useCallback } from "react";
import styled from "styled-components";

import { Box } from "@primer/react";

import LoadMore from "@/app/components/feed/mainContent/LoadMore";
import PostItem from "@/app/components/feed/mainContent/PostItem";
import HeadUnderLine from "@/app/components/feed/mainContent/HeadUnderLine";
import PostBanner from "@/app/components/feed/mainContent/PostBanner";

import Footer from "../Footer";

import { User } from "@prisma/client";
import { usePaginatePosts } from "@/hooks/usePaginatePosts";

type Props = {
  currentUser?: User | null;
};

const MainContent = ({ currentUser }: Props) => {

  const {
    paginateData: paginatePosts,
    isLoadingMore,
    isReachingEnd,
    error,
    setSize,
    size,
  } = usePaginatePosts("/api/posts");

  // handle load more
  const loadNextPost = useCallback(
    async () => await setSize(size + 1),
    [size, setSize]
  );

  if (!paginatePosts) return <>load post...</>;

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

        {paginatePosts &&
          paginatePosts?.map((post) => (
            <PostItem key={post.id} currentUser={currentUser} post={post} />
          ))}
        <LoadMore
          isLoadingMore={isLoadingMore}
          isReachingEnd={isReachingEnd}
          loadNextPost={loadNextPost}
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
