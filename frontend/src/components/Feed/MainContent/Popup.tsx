import React from "react";
import { Box, Heading, Popover, Text } from "@primer/react";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { MyButton } from "../../Auth";
import { ReactionButtonType } from "./PostItem";
import { XCircleFillIcon } from "@primer/octicons-react";

type Props = {
  selected: ReactionButtonType;
  setSelected: React.Dispatch<React.SetStateAction<ReactionButtonType>>;
};

const Popup = ({ selected, setSelected }: Props) => {
  return (
    <Popover
      relative
      open={selected.share}
      caret="bottom"
      sx={{
        position: "absolute",
        left: "52%",
        bottom: "25%",
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
        <Box display="flex" flexDirection="column">
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
              <Text sx={{ marginInlineStart: "10px", alignContent: "center" }}>
                Facebook
              </Text>
            </div>
          </MyButton>
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
        </Box>
      </Popover.Content>
    </Popover>
  );
};

export default Popup;
