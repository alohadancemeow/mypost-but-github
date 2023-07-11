import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { Post, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useAuthModal from "./useAuthModal";
import axios, { AxiosError } from "axios";
import { like, unlike } from "@/actions/serverActions";

import { useMutation, useQueryClient } from '@tanstack/react-query'

type Props = {
  post: Post;
  currentUser?: User | null;
};

const useLike = ({ post, currentUser }: Props) => {
  const router = useRouter();
  const authModal = useAuthModal();

  // Get access to query client instance
  const queryClient = useQueryClient()

  // like
  const {mutate: likeMutation} = useMutation({
    mutationFn: async () => {
     await axios.post(`/api/post/${post.id}`)
    },
    onSuccess: ()=> {
      queryClient.invalidateQueries(['posts-query'])
    }
  })

  // unlike
  const {mutate: unlikeMutation} = useMutation({
    mutationFn: async () => {
     await axios.delete(`/api/post/${post.id}`)
    },
    onSuccess: ()=> {
      queryClient.invalidateQueries(['posts-query'])
    }
  })

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
        // request = ()=> unlike(post.id)
        request = () => unlikeMutation()
      } else {
        // request = () => axios.post(`/api/post/${post.id}`);
        // request =()=> like(post.id)
        request = () => likeMutation()
      }

      // await request();
     request();

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
