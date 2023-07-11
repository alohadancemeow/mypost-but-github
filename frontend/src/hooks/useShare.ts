import { useCallback } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { useMutation, useQueryClient } from '@tanstack/react-query'


type Props = {
  postId: string;
};

const useShare = ({ postId }: Props) => {
  const router = useRouter();

  // Get access to query client instance
  const queryClient = useQueryClient()

  // const sharePost = useCallback(async () => {
  //   axios
  //     .patch(`/api/post/${postId}`)
  //     .then((data) => {
  //       if (data.status === 200) {
  //         router.refresh();
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);

  //       if (error instanceof AxiosError) {
  //         toast.error(error.response?.data);
  //       }
  //     });
  // }, [postId]);

  const {mutate: shareMutation} = useMutation({
    mutationFn: async ()=> {
      await axios.patch(`/api/post/${postId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts-query'])
    }
  })

  return { shareMutation };
};

export default useShare;
