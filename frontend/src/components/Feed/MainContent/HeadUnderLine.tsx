import React from "react";
import { HomeIcon } from "@primer/octicons-react";
import { Box, StyledOcticon, Text, UnderlineNav } from "@primer/react";

type Props = {};

const HeadUnderLine = (props: Props) => {
  return (
    <Box
      marginTop="30px"
      color="#444C56"
      sx={{
        position: "sticky",
        top: "0",
        zIndex: "1",
        bg: "canvas.primary",
      }}
    >
      <UnderlineNav aria-label="Main">
        <UnderlineNav.Link
          aria-current="page"
          href="#"
          selected
          sx={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <StyledOcticon icon={HomeIcon} size={24} sx={{ mr: "8px" }} />
            <Text
              sx={{ fontSize: "14px", lineHeight: "20px", fontWeight: "600" }}
            >
              Feed
            </Text>
          </Box>
        </UnderlineNav.Link>
      </UnderlineNav>
    </Box>
  );
};

export default HeadUnderLine;
