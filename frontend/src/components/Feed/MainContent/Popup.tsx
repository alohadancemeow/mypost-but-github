'use client'

import React from "react";
import styled from "styled-components";

import { Box, Heading, Popover, Text } from "@primer/react";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { MyButton } from "@/components/Auth/AuthModal";
import { ReactionButtonType } from "./PostItem";
import { XCircleFillIcon } from "@primer/octicons-react";

import { FacebookShareButton, TwitterShareButton } from "react-share";
import { siteMetadata } from "../../../../site/siteMetadata";

type Props = {
  selected: ReactionButtonType;
  setSelected: React.Dispatch<React.SetStateAction<ReactionButtonType>>;
};

const Popup = ({ selected, setSelected }: Props) => {
  return (
    <MyPopover
      relative
      open={selected.share}
      caret="bottom"
      sx={{
        position: "absolute",
        left: "38%",
        bottom: "15%",
      }}
    >
      <Popover.Content
        sx={{ mt: 2, bg: "#444C56", width: "200px", border: "none" }}
      >
        <Box
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Heading sx={{ fontSize: 2, marginBottom: "10px" }}>
            Share with:
          </Heading>
          <span
            style={{
              cursor: "pointer",
            }}
            onClick={() => setSelected({ ...selected, share: !selected.share })}
          >
            <XCircleFillIcon size={24} />
          </span>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <FacebookShareButton
            // url="http://github.com"
            url={`${siteMetadata.siteAddress}`}
            title="Let's talk about this"
            hashtag="#mypostbutgithub"
          >
            <MyButton
              h="34px"
              // color="#2E89F1"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  // marginInlineStart: "15px",
                }}
              >
                <BsFacebook size={18} color="#2E89F1" />
                <Text
                  sx={{ marginInlineStart: "10px", alignContent: "center" }}
                >
                  Facebook
                </Text>
              </div>
            </MyButton>
          </FacebookShareButton>
          <TwitterShareButton
            // url="http://github.com"
            url={`${siteMetadata.siteAddress}`}
            hashtags={["mypostbutgithub"]}
            title="Let's talk about this"
          >
            <MyButton rounded="16px" h="34px" color="#444C56" gap="5px 0">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  // marginInlineStart: "15px",
                }}
              >
                <BsTwitter size={18} color="#2E89F1" />
                <Text sx={{ marginInlineStart: "10px" }}>Twitter</Text>
              </div>
            </MyButton>
          </TwitterShareButton>
        </Box>
      </Popover.Content>
    </MyPopover>
  );
};

export default Popup;

// responsive
const MyPopover = styled(Popover)`
  @media (max-width: 820px) {
    left: 44%;
  }
`;
