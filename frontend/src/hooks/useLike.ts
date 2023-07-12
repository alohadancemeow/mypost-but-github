import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import {  User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useAuthModal from "./useAuthModal";
import axios, { AxiosError } from "axios";
// import { like, unlike } from "@/actions/serverActions";

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostPopulated } from "@/types";

type Props = {
  post: PostPopulated;
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
    onMutate: async (newData: PostPopulated) => {

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts-query', newData.id]})

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(['posts-query', newData.id])

      // Optimistically update to the new value
      queryClient.setQueryData(['posts-query', newData.id], newData)


      // Return a context with the previous and new todo
      return { previousData, newData }
    },

    // If the mutation fails, use the context we returned above
    onError: (err, newData, context) => {
      queryClient.setQueryData(['posts-query', context?.newData.id], context?.previousData)
    },

    // Always refetch after error or success:
    onSuccess: (newData: any)=> {
      queryClient.invalidateQueries({queryKey: ['posts-query', newData?.id]})
    }
  })

  // unlike
  const {mutate: unlikeMutation} = useMutation({
    mutationFn: async () => {
     await axios.delete(`/api/post/${post.id}`)
    },
    onMutate: async (newData: PostPopulated) => {

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts-query', newData.id]})

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(['posts-query', newData.id])

      // Optimistically update to the new value
      queryClient.setQueryData(['posts-query', newData.id], newData)


      // Return a context with the previous and new todo
      return { previousData, newData }
    },
    
    // If the mutation fails, use the context we returned above
    onError: (err, newData, context) => {
      queryClient.setQueryData(['posts-query', context?.newData.id], context?.previousData)
    },

    // Always refetch after error or success:
    onSuccess: (newData: any)=> {
      queryClient.invalidateQueries({queryKey: ['posts-query', newData?.id]})
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
        request = () => unlikeMutation(post)
      } else {
        request = () => likeMutation(post)
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
