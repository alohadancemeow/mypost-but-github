import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";

type Props = {
  postId: string;
  body?: string;
};

const useComment = ({ postId, body }: Props) => {
  const router = useRouter();

  const createComment = useCallback(async () => {
    axios
      .post(`/api/comment`, {
        postId,
        body,
      })
      .then((data) => {
        if (data.status === 200) {
          router.refresh();
          toast.success("comment created!");
        }
      })
      .catch((error) => {
        console.log(error);

        if (error instanceof AxiosError) {
          toast.error(error.response?.data);
        }
      });
  }, [postId, body]);

  return { createComment };
};

export default useComment;
