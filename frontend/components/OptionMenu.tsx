"use client";

import { Copy, EllipsisVertical, Trash2 } from "lucide-react";
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

import useOptionModal from "@/hooks/use-option-modal";
import { useAuth } from "@clerk/nextjs";
import { Post } from "@prisma/client";
import { toast } from "sonner";
import useDeletePost from "@/hooks/use-delete-post";

type Props = {
  post: Post;
};

const OptionMenu = ({ post }: Props) => {
  const optionModal = useOptionModal();
  const { userId } = useAuth();

  const { deletePost, isPending } = useDeletePost();

  const onCopy = () => {
    navigator.clipboard.writeText(`${window.location.href}/post/${post.id}`);
    toast("Link copied 🎉", {
      duration: 1500,
    });
  };

  const onDelete = async () => {
    await deletePost(post.id).then((res) => {
      if (res.status === 200) {
        toast("Post deleted ‼️", {
          duration: 1500,
        });
      }
    });
  };

  return (
    <DropdownMenu onOpenChange={optionModal.onClose}>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical
          className="cursor-pointer"
          size={15}
          onClick={() => optionModal.onOpen()}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuLabel>Post Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {userId === post.userId && (
            <DropdownMenuItem onClick={onDelete}>
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
