"use client";

import { Copy, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useOptionModal from "@/store/use-option-modal";
import { useAuth } from "@clerk/nextjs";
import { Post } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deletePost } from "@/actions/post-actions";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  post: Post;
  isPost?: boolean;
};

const OptionMenu = ({ post, isPost }: Props) => {
  const optionModal = useOptionModal();
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition()

  const onCopy = () => {
    const text = isPost
      ? `${window.location.href}`
      : `${window.location.href}post/${post.id}`;

    navigator.clipboard.writeText(text);
    toast.success("Link copied 🎉", {
      duration: 1500,
    });
  };

  const onDeletePost = async () => {
    if (isPending) return;

    const promise = deletePost(post.id);

    toast.promise(promise, {
      loading: "Deleting...",
      success: () => {
        return `Post deleted ‼️`;
      },
      error: "Error",
    });

    try {
      await promise;

      queryClient.setQueriesData({ queryKey: ["posts-query"] }, (oldData: any) => {
        if (!oldData?.pages?.length) return oldData;
        const pages = oldData.pages.map((page: any[]) =>
          (page ?? []).filter((p) => p?.id !== post.id)
        );
        return { ...oldData, pages };
      });

      queryClient.invalidateQueries({ queryKey: ["posts-query"] });
      queryClient.invalidateQueries({ queryKey: ["saved-count"] });
      router.refresh();
    } catch (error: any) {
      toast.error(`${error.message} ‼️`, { duration: 1500 });
    }
  };

  if (!isLoaded) return null;

  return (
    <DropdownMenu onOpenChange={optionModal.onClose}>
      <DropdownMenuTrigger asChild>
        <MoreHorizontal
          className="cursor-pointer z-10"
          size={15}
          onClick={() => optionModal.onOpen()}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuLabel>Post Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {userId === post.userId && (
            <DropdownMenuItem disabled={isPending} onClick={() => startTransition(onDeletePost)}>
              Delete
              <DropdownMenuShortcut>
                <Trash2 size={15} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={onCopy}>
            Share
            <DropdownMenuShortcut>
              <Copy size={15} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionMenu;
