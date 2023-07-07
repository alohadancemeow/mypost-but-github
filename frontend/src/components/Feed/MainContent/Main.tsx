"use client";

import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { Box } from "@primer/react";

import LoadMore from "./LoadMore";
import PostItem from "./PostItem";
import HeadUnderLine from "./HeadUnderLine";
import PostBanner from "./PostBanner";

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

  //TODO:  Create comment

  // Handle onCreateComment
  const onCreateComment = useCallback(
    async (postId: string, commentBody: string) => {
      //
    },
    []
  );

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
        // color="fg.onEmphasis"
        // border="1px solid red"
        // borderLeft="1px solid #636568"
        borderRadius="8px"
      >
        <PostBanner currentUser={currentUser} />
        <HeadUnderLine />

        {paginatePosts &&
          paginatePosts?.map((post) => (
            <PostItem
              key={post.id}
              currentUser={currentUser}
              post={post}
              onCreateComment={onCreateComment}
            />
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
