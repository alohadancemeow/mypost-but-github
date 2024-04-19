"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import usePostModal from "@/hooks/usePostModal";
import Toolbar from "./feed/mainContent/Toolbar";

import { BlockNoteEditor } from "@blocknote/core";
import { NewTag } from "./new-tag";

const content = `Hello, **world!**`;

type Props = {};

const PostDrawer = (props: Props) => {
  const [markdown, setMarkdown] = useState<string>("");
  const [title, setTitle] = useState<string>("Untitled");
  const { isOpen, onClose } = usePostModal();

  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/Editor"), {
        ssr: false,
      }),
    []
  );

  /**
   * Converts the editor's contents from Block objects to Markdown
   * and store to state.
   */
  const onChange = async (editor: BlockNoteEditor) => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    setMarkdown(markdown);
  };

  const onCreatePost = async () => {};

  return (
    <Drawer open={isOpen}>
      <DrawerContent className="bg-[#1F1F1F] border-none">
        <div className="mx-auto w-full h-full min-h-[850px] flex flex-col">
          <ScrollArea className="h-[600px]">
            <div className="h-full">
              <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
                <Toolbar title={title} setTitle={setTitle} />
                <Editor onChange={onChange} initialContent={content} editable />
              </div>
            </div>
          </ScrollArea>
          <DrawerFooter>
            <div className="flex gap-3 justify-center items-center">
              <NewTag />
              <Button className="bg-blue-700 hover:bg-blue-900">
                Create post
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PostDrawer;
