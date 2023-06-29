import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { Post, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useAuthModal from "./useAuthModal";

import { trpc } from "@/utils/trpcClient";

type Props = {
  post: Post;
  currentUser?: User | null;
};

const useLike = ({ post, currentUser }: Props) => {
  const router = useRouter();
  const authModal = useAuthModal();

  //   trpc mutation
  const { mutate: like } = trpc.post.like.useMutation();
  const { mutate: unlike } = trpc.post.unlike.useMutation();

  const hasLiked = useMemo(() => {
    const list = post?.likedIds || [];

    return list.includes(currentUser?.id!);
  }, [post, currentUser]);

  const toggleLike = useCallback(() => {
    if (!currentUser) {
      return authModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        request = () => unlike({ postId: post.id, userId: currentUser.id });
      } else {
        request = () => like({ postId: post.id, userId: currentUser.id });
      }

      request();

      router.refresh();
      // toast.success("Success");
    } catch (error) {
      // toast.error("Something went wrong");
    }
  }, [currentUser, hasLiked, post.id, authModal]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
