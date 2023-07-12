import { useCallback } from "react";
import axios from "axios";

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostPopulated } from "@/types";


type Props = {
  post: PostPopulated;
};

const useShare = ({ post }: Props) => {

  // Get access to query client instance
  const queryClient = useQueryClient()

  const {mutate: shareMutation} = useMutation({
    mutationFn: async ()=> {
      await axios.patch(`/api/post/${post.id}`)
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

  const share = useCallback(()=> shareMutation(post), [post])
  
  return { share };
}

export default useShare;
