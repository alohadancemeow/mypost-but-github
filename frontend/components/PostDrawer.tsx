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
import NewTag from "./new-tag";

import { BlockNoteEditor } from "@blocknote/core";
import { Tag, TagOptions } from "@/data/tags";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { PostValidator } from "@/types";
import { z } from "zod";
import { toast } from "sonner";

const content = `<p class="bn-inline-content">Hello, <strong>world!</strong></p><p class="bn-inline-content"></p>`;

type Props = {};

const PostDrawer = (props: Props) => {
  const [html, setHTML] = useState<string>("");
  const [title, setTitle] = useState<string>("Untitled");
  const [selectedTag, setSelectedtag] = useState<Tag | null>(null);
  const { isOpen, onClose } = usePostModal();

  const { userId } = useAuth();

  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/Editor"), {
        ssr: false,
      }),
    []
  );

  /**
   * Converts the editor's contents from Block objects to HTML
   * and store to state.
   */
  const onChange = async (editor: BlockNoteEditor) => {
    const html = await editor.blocksToHTMLLossy(editor.document);
    setHTML(html);
  };

  const onCreatePost = async () => {
    if (!userId) return;
    const postData: z.infer<typeof PostValidator> = {
      title: title,
      body: html,
      tag: selectedTag?.value ?? TagOptions[0]!.value,
    };

    try {
      const response = await axios.post("/api/post", postData);

      if (response.data) {
        toast("Post has been created 🎉", {
          // description: `${response.data}`,
          duration: 1500,
        });

        setHTML("");
        setTitle("Untitled");
        setSelectedtag(null);
      }
    } catch (error: any) {
      console.log(error, "error");

      toast(`${error.message} ‼️`, {
        // description: `${response.data}`,
        duration: 1500,
      });
    } finally {
      onClose();
    }
  };

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
              <NewTag
                selectedTag={selectedTag}
                setSelectedtag={setSelectedtag}
              />
              <Button
                className="bg-blue-700 hover:bg-blue-900"
                onClick={onCreatePost}
              >
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
