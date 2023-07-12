"use client";

import Modal from "./Modal";
import { Box, Text } from "@primer/react";
import { RocketIcon } from "@primer/octicons-react";

import usePostModal from "@/hooks/usePostModal";
import Editor from "../editor/Editor";

type Props = {};

const PostModal = (props: Props) => {
  const { isOpen, onClose, onOpen } = usePostModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title={
        <Box display="flex" justifyContent={"center"} alignItems="center">
          <RocketIcon size={24} fill="white" />
          <Text
            as="p"
            sx={{
              fontWeight: "bold",
              color: "canvas.default",
              padding: "0 10px",
              fontSize: "18px",
            }}
          >
            Create post
          </Text>
        </Box>
      }
      // description="Let's post something"
      isOpen={isOpen}
      onChange={onChange}
      isPost
    >
      <Editor />
    </Modal>
  );
};

export default PostModal;
