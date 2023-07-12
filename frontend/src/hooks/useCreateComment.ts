import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { CommentInput } from "@/types";


const useCreateComment = () => {
  const router = useRouter();

  // Get access to query client instance
  const queryClient = useQueryClient()

  const { mutateAsync: createCommentMutation } = useMutation({
    mutationFn: async (payload: CommentInput) => {
      return await axios.post(`/api/comment`, { ...payload })
    },
    onMutate: async (newData: any) => {

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts-query', newData.id] })

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

    onSuccess: (newData: any) => {
      queryClient.invalidateQueries({ queryKey: ['posts-query', newData?.id] })
    }
  })


  const createComment = useCallback(async (payload: CommentInput) => {
    if (!payload) return null

    try {
      const data = await createCommentMutation(payload)

      if (data.status === 200) {
        router.refresh();
        toast.success("comment created!");
      }
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        return toast.error(error.message);
      }

      toast.error("Something went wrong");
    }

  }, [createCommentMutation]);

  return { createComment };
};

export default useCreateComment;
