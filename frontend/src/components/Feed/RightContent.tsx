import React from "react";
import { Box, CircleBadge, Heading, StyledOcticon, Text } from "@primer/react";
import { NumberIcon } from "@primer/octicons-react";

type Props = {};

const RightContent = (props: Props) => {
  return (
    <Box
      p={3}
       border="1px solid red"
    >
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent="flex-start"
        marginBottom={3}
      >
        <StyledOcticon icon={NumberIcon} size={24} sx={{ mr: "10px" }} />
        <Heading sx={{ fontSize: "14px", lineHeight: "20px" }}>
          Popular Posts
        </Heading>
      </Box>

      <Box marginBottom={4} marginTop={4}>
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <Box
              key={index}
              marginTop={3}
              display="flex"
              alignItems={"center"}
              justifyContent="flex-start"
              onClick={() => console.log("usercard clicked", index)}
            >
              <Box>
                <CircleBadge
                  size={30}
                  sx={{
                    color: "#006EED",
                    bg: "transparent",
                    border: "1px solid white",
                  }}
                >
                  {index + 1}
                </CircleBadge>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                marginLeft="15px"
                border="1px solid #444C56"
                borderRadius="4px"
                padding="10px 15px"
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    opacity: 0.7,
                  },
                }}
              >
                <Text fontSize="16px" marginBottom="8px">
                  postname{" "}
                  <span style={{ fontSize: "12px", color: "#ADBAC7" }}>
                    · 2.32 PM
                  </span>{" "}
                </Text>
                <Text fontSize="12px" color="#ADBAC7">
                  Publish your digital garden, docs or any markdown based site
                  easily
                </Text>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default RightContent;
