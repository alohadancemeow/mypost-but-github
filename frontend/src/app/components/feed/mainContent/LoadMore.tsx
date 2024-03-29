"use client";

import { RocketIcon } from "@primer/octicons-react";
import { Box, StyledOcticon, Text } from "@primer/react";

type Props = {
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  loadNextPost: () => Promise<void>;
};

const LoadMore = ({  loadNextPost, hasNextPage,isFetchingNextPage }: Props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin="50px 0"
      padding="10px"
      border="1px solid #444C56"
      sx={{
        cursor: `${isFetchingNextPage ? "not-allowed" : "pointer"}`,
        ":hover": {
          opacity: 0.7,
        },
      }}
      onClick={loadNextPost}
    >
      {!isFetchingNextPage && (
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
        {isFetchingNextPage
          ? "Loading..."
          : hasNextPage
          ? "More"
          : "Mo more post"}
      </Text>
    </Box>
  );
};

export default LoadMore;
