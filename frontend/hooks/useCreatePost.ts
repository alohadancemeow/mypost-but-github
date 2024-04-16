import axios, { AxiosError } from 'axios';
import { useCallback } from 'react'
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FormData } from '../types'
import { toast } from 'react-hot-toast';
import usePostModal from './usePostModal';


const useCreatePost = () => {
  const router = useRouter();
  const postModal = usePostModal()

  // Get access to query client instance
  const queryClient = useQueryClient()

  const { mutateAsync: createPostMutation } = useMutation({
    mutationFn: async (payload: FormData) => {
      return await axios.post(`/api/post`, { ...payload })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts-query'] })
    }
  })

  const createPost = useCallback(async (payload: FormData) => {
    try {

      if (!payload) return null

      const data = await createPostMutation(payload)

      if (data.status === 200) {
        toast.success("Post created.");
        postModal.onClose()
        router.refresh()
      }

    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }

      toast.error("Something went wrong");
    }
  }, [createPostMutation, postModal])

  return { createPost }
}

export default useCreatePost