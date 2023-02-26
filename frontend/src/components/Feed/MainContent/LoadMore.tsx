import React from "react";
import { RocketIcon } from "@primer/octicons-react";
import { Box, StyledOcticon, Text } from "@primer/react";

type Props = {
  hasNextPage?: boolean;
  isFetching?: boolean;
  loadNextPost: () => Promise<void>;
};

const LoadMore = ({ hasNextPage, isFetching, loadNextPost }: Props) => {
  const handleLoadMore = async () => {
    if (hasNextPage && !isFetching) {
      await loadNextPost();
    }
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin="50px 0"
      padding="10px"
      border="1px solid #444C56"
      sx={{
        cursor: "pointer",
        ":hover": {
          opacity: 0.7,
        },
      }}
      onClick={() => {
        handleLoadMore();
      }}
    >
      {hasNextPage && (
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
        {hasNextPage && !isFetching ? "More" : "No more post"}
      </Text>
    </Box>
  );
};

export default LoadMore;
