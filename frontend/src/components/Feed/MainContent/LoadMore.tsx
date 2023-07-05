"use client";

import React, { useCallback } from "react";
import { RocketIcon } from "@primer/octicons-react";
import { Box, StyledOcticon, Text } from "@primer/react";

type Props = {
  isLoadingMore?: boolean;
  isReachingEnd?: boolean;
  loadNextPost: () => Promise<any[] | undefined>;
};

const LoadMore = ({ isLoadingMore, isReachingEnd, loadNextPost }: Props) => {
  const handleLoadMore = useCallback(async () => {
    if (!isReachingEnd && !isLoadingMore) {
      await loadNextPost();
    }
  }, [loadNextPost, isReachingEnd, isLoadingMore]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin="50px 0"
      padding="10px"
      border="1px solid #444C56"
      sx={{
        cursor: `${isReachingEnd ? "not-allowed" : "pointer"}`,
        ":hover": {
          opacity: 0.7,
        },
      }}
      onClick={handleLoadMore}
    >
      {!isReachingEnd && (
        <StyledOcticon icon={RocketIcon} size={18} sx={{ mr: "8px" }} />
      )}
      <Text
        sx={{
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: "600",
          color: "#006EED",
        }}
      >
        {isLoadingMore
          ? "Loading..."
          : !isReachingEnd
          ? "More"
          : "Mo more post"}
      </Text>
    </Box>
  );
};

export default LoadMore;
