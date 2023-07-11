import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { Post, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useAuthModal from "./useAuthModal";
import axios, { AxiosError } from "axios";
import { like, unlike } from "@/actions/serverActions";

type Props = {
  post: Post;
  currentUser?: User | null;
};

const useLike = ({ post, currentUser }: Props) => {
  const router = useRouter();
  const authModal = useAuthModal();

  const hasLiked = useMemo(() => {
    const list = post?.likedIds || [];

    return list.includes(currentUser?.id!);
  }, [post, currentUser]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return authModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        // request = () => axios.delete(`/api/post/${post.id}`);
        request = ()=> unlike(post.id)
      } else {
        // request = () => axios.post(`/api/post/${post.id}`);
        request =()=> like(post.id)
      }

      await request();

      router.refresh();
      toast.success("Success");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }

      toast.error("Something went wrong");
    }
  }, [currentUser, hasLiked, post.id, authModal]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
