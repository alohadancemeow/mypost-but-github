import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
// import { like, unlike } from "@/actions/serverActions";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostPopulated } from "../types";
import { useUser } from "@clerk/nextjs";

type Props = {
  post: PostPopulated;
};

const useSavePost = ({ post }: Props) => {
  const router = useRouter();
  const { user } = useUser();

  // Get access to query client instance
  const queryClient = useQueryClient();

  // save
  const { mutate: saveMutation } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/post/${post.id}/save`);
    },
    onMutate: async (newData: PostPopulated) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ["posts-query", newData.id],
      });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData([
        "posts-query",
        newData.id,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(["posts-query", newData.id], newData);

      // Return a context with the previous and new todo
      return { previousData, newData };
    },

    // If the mutation fails, use the context we returned above
    onError: (err, newData, context) => {
      queryClient.setQueryData(
        ["posts-query", context?.newData.id],
        context?.previousData
      );
    },

    // Always refetch after error or success:
    onSuccess: (newData: any) => {
      queryClient.invalidateQueries({ queryKey: ["posts-query", newData?.id] });
    },
  });

  // unsave
  const { mutate: unsaveMutation } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/post/${post.id}/save`);
    },
    onMutate: async (newData: PostPopulated) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ["posts-query", newData.id],
      });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData([
        "posts-query",
        newData.id,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(["posts-query", newData.id], newData);

      // Return a context with the previous and new todo
      return { previousData, newData };
    },

    // If the mutation fails, use the context we returned above
    onError: (err, newData, context) => {
      queryClient.setQueryData(
        ["posts-query", context?.newData.id],
        context?.previousData
      );
    },

    // Always refetch after error or success:
    onSuccess: (newData: any) => {
      queryClient.invalidateQueries({ queryKey: ["posts-query", newData?.id] });
    },
  });

  const hasSaved = useMemo(() => {
    const list = post?.saveIds || [];

    return list.includes(user?.id!);
  }, [post, user]);

  const toggleSave = useCallback(async () => {
    try {
      let request: () => void;

      if (hasSaved) {
        request = () => unsaveMutation(post);
      } else {
        request = () => saveMutation(post);
      }

      // await request();
      request();

      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }

      toast.error("Something went wrong");
    }
  }, [user, hasSaved, post.id]);

  return {
    hasSaved,
    toggleSave,
  };
};

export default useSavePost;
