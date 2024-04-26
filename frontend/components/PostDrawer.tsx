"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import usePostModal from "@/hooks/use-post-modal";

import NewTag from "./new-tag";

import { BlockNoteEditor } from "@blocknote/core";
import { Tag, TagOptions } from "@/data/tags";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

import Toolbar from "./Toolbar";
// import { createPost } from "@/actions/serverActions";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import useCreatePost from "@/hooks/use-create-post";
import { useGetUserList } from "@/hooks/use-get-user-list";

const content = `<p class="bn-inline-content">Hello, <strong>world!</strong></p><p class="bn-inline-content"></p>`;

type Props = {};

const PostDrawer = (props: Props) => {
  const [html, setHTML] = useState<string>("");
  const [title, setTitle] = useState<string>("Untitled");
  const [selectedTag, setSelectedtag] = useState<Tag | null>(null);
  const { isOpen, onClose } = usePostModal();

  const router = useRouter();
  const { userId } = useAuth();
  const { createPost, isPending } = useCreatePost();
  const { usernames, isFetching } = useGetUserList();

  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/editor/Editor"), {
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

    try {
      const post = await createPost({
        title: title ?? "Untitled",
        body: html,
        tag: selectedTag?.value ?? TagOptions[0]!.value,
      });

      if (post) {
        toast.success("Post has been created 🎉", {
          // description: `${response.data}`,
          duration: 1500,
        });

        setHTML("");
        setTitle("Untitled");
        setSelectedtag(null);
        router.refresh();
      }
    } catch (error: any) {
      console.log(error, "error");

      toast.error(`${error.message} ‼️`, {
        // description: `${response.data}`,
        duration: 1500,
      });
    } finally {
      onClose();
    }
  };

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent className="bg-[#1F1F1F] border-none">
        <div className="mx-auto w-full h-full min-h-[850px] flex flex-col">
          <ScrollArea className="h-[600px]">
            <div className="h-full">
              <div className="gap-3 flex justify-end my-4 mx-8">
                <Button size="sm" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-700 hover:bg-blue-900"
                  disabled={isPending}
                  type="submit"
                  onClick={onCreatePost}
                >
                  {isPending ? (
                    <>
                      <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                      <div>Create post</div>
                    </>
                  ) : (
                    <div>Create post</div>
                  )}
                </Button>
              </div>
              <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
                <Toolbar title={title} setTitle={setTitle} />
                <NewTag
                  selectedTag={selectedTag}
                  setSelectedtag={setSelectedtag}
                />
                <Editor
                  onChange={onChange}
                  initialContent={content}
                  editable
                  users={usernames}
                />
              </div>
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PostDrawer;
