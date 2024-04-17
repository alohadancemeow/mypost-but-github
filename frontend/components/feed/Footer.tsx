"use client";

import { Box, Text, UnderlineNav } from "@primer/react";
import { RocketIcon } from "@primer/octicons-react";

const Footer = () => {
  return (
    <Box
      sx={{
        // margin: "0 10px",
        color: "#57606A",
        // border: "1px solid red",
      }}
    >
      {/* <UnderlineNav aria-label="Main" /> */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        // paddingLeft={30}
        marginBottom={24}
      >
        <Text
          as="p"
          sx={{
            fontWeight: "bold",
            color: "#57606A",
            padding: "10px 0 0",
            fontSize: "12px",
          }}
        >
          <RocketIcon size={20} fill="#57606A" /> {"  "}
          {`© ${new Date().getFullYear()} Mypost but Github`}
        </Text>
        <Text
          sx={{
            color: "#57606A",
            fontSize: "12px",
            padding: "0",
          }}
        >
          Made with 💙 by alohadancemeow x FailureMan
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
