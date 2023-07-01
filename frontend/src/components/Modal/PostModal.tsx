"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { Box, StyledOcticon, Text } from "@primer/react";
import { RocketIcon } from "@primer/octicons-react";

import usePostModal from "@/hooks/usePostModal";
import styled from "styled-components";

import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import EditorJS from "@editorjs/editorjs";

import "@/styles/editor.css";

export const PostValidator = z.object({
  title: z.string(),
  content: z.any(),
});

type FormData = z.infer<typeof PostValidator>;

type Props = {};

const PostModal = (props: Props) => {
  const { isOpen, onClose, onOpen } = usePostModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: "",
      content: null,
    },
  });
  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  console.log(ref.current, "ref");
  console.log(isMounted, "isMounted");

  //   # Initialize Editor JS
  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        // inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  //   # Mount efffect
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  //   # initializeEditor effect
  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  // # Handle submit
  const onSubmit = async () => {
    // TODO: create post
  };

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register("title");

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
    >
      <div className="flex flex-col items-start gap-6">
        <div className="w-full rounded-lg border p-4">
          <form
            id="post-form"
            className="w-fit"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="prose prose-stone dark:prose-invert">
              <TextareaAutosize
                ref={(e) => {
                  titleRef(e);
                  // @ts-ignore
                  _titleRef.current = e;
                }}
                {...rest}
                placeholder="Title"
                className="text-md w-full resize-none appearance-none overflow-hidden bg-transparent focus:outline-none"
              />
              <div id="editor" className="min-h-[500px]" />
              <p className="text-sm text-gray-500">
                Use{" "}
                <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                  Tab
                </kbd>{" "}
                to open the command menu.
              </p>
            </div>
          </form>
        </div>

        <MyBox>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding="10px"
            width="100%"
            border="1px solid #444C56"
            sx={{
              cursor: "pointer",
              ":hover": {
                opacity: 0.7,
              },
            }}
            // onClick={onSubmit}
          >
            <StyledOcticon
              icon={RocketIcon}
              size={18}
              sx={{ mr: "8px", color: "white" }}
            />
            <Text
              sx={{
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: "600",
                color: "#006EED",
              }}
            >
              Post
            </Text>
          </Box>
        </MyBox>
      </div>
    </Modal>
  );
};

export default PostModal;

// customize box
const MyBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 20px auto;
  width: 100%;
`;
