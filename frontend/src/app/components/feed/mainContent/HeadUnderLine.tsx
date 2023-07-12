'use client'

import React from "react";
import { HomeIcon } from "@primer/octicons-react";
import { Box, IssueLabelToken, Label, StyledOcticon, Text, Token, UnderlineNav } from "@primer/react";

const HeadUnderLine = () => {
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
          onSelect={()=> {}}
          sx={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            {/* <StyledOcticon icon={HomeIcon} size={24} sx={{ mr: "8px" }} /> */}
            <Text
              sx={{ fontSize: "14px", lineHeight: "20px", fontWeight: "600" , mr: '10px'}}
            >
              Feed
            </Text>
            {/* <Label variant="success">For you</Label> */}
            {/* <Token size="medium" text="For you" /> */}
            <IssueLabelToken text="For you" fillColor="#006EED" isSelected size="medium"/>
          </Box>
        </UnderlineNav.Link>
        <UnderlineNav.Link
          aria-current="page"
          href="/"
          selected
          sx={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            {/* <StyledOcticon icon={HomeIcon} size={24} sx={{ mr: "8px" }} /> */}
            <Text
              sx={{ fontSize: "14px", lineHeight: "20px", fontWeight: "600" }}
            >
              Following
            </Text>
          </Box>
        </UnderlineNav.Link>
      </UnderlineNav>
    </Box>
  );
};

export default HeadUnderLine;
