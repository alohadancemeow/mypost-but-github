"use client";

import { RocketIcon } from "@primer/octicons-react";
import { Box, StyledOcticon, Text } from "@primer/react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styled from "styled-components";

import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import EditorJS from "@editorjs/editorjs";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import "@/styles/editor.css";

import { toast } from "react-hot-toast";
import { FormData, PostValidator } from "@/types";
import { TagOptions } from "@/data/tags";
import useCreatePost from "@/hooks/useCreatePost";



type Props = {};

const Editor = (props: Props) => {
  const animatedComponents = useMemo(() => makeAnimated(), [TagOptions]);

  const { createPost } = useCreatePost()

  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<typeof TagOptions>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: "",
      content: null,
      tags: [],
    },
  });

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
        placeholder: "Type here to write your post body...",
        inlineToolbar: true,
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

  // # Handle submit --> create post
  const onSubmit = useCallback(async (data: FormData) => {
    const blocks = await ref.current?.save();

    if (
      !data.title ||
      blocks?.blocks.length === 0 ||
      selectedOption?.length === 0
    ) {
      return toast.error("please complete all form");
    }

    const payload: FormData = {
      title: data.title,
      content: blocks,
      tags: selectedOption?.map((tag) => tag.label)!,
    };

    if (payload) {
      await createPost(payload)
    }

  }, [selectedOption, createPost])


  // # Check if isMounted
  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register("title");

  return (
    <div className="flex min-w-[500px] flex-col items-start gap-6">
      <div className="w-full p-4 rounded-lg">
        <form
          id="post-form"
          className="w-full "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full prose prose-stone dark:prose-invert ">
            <TextareaAutosize
              ref={(e) => {
                titleRef(e);
                // @ts-ignore
                _titleRef.current = e;
              }}
              {...rest}
              placeholder="Title"
              className="w-full overflow-hidden text-3xl text-white bg-transparent appearance-none resize-none focus:outline-none"
            />
            <div
              id="editor"
              className="prose prose-invert min-h-[350px] w-full "
            />
            <p className="text-sm text-gray-500">
              Use{" "}
              <kbd className="px-1 text-xs uppercase border rounded-md bg-muted">
                Tab
              </kbd>{" "}
              to open the command menu.
            </p>
          </div>

          <Select
            defaultValue={selectedOption}
            isMulti
            name="tags"
            options={TagOptions}
            // className="mt-8 "
            placeholder="Choose your tag..."
            components={animatedComponents}
            // value={selectedOption}
            // @ts-expect-error
            onChange={setSelectedOption}
            classNames={{
              control: () => "mt-8",
              // input: () => "text-lg",
              // option: () => "text-lg",
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 6,
              colors: {
                ...theme.colors,
                primary: "black",
                primary25: "#868c94",
              },
            })}
          />
        </form>
      </div>

      <MyBox as="button" type="submit" form="post-form" disabled={isSubmitting}>
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
  );
};

export default Editor;

// customize box
const MyBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 20px auto;
  width: 100%;
`;
