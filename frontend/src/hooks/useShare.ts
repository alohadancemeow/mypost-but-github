import { useCallback } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type Props = {
  postId: string;
};

const useShare = ({ postId }: Props) => {
  const router = useRouter();

  const sharePost = useCallback(async () => {
    axios
      .patch(`/api/post/${postId}`)
      .then((data) => {
        if (data.status === 200) {
          router.refresh();
        }
      })
      .catch((error) => {
        console.log(error);

        if (error instanceof AxiosError) {
          toast.error(error.response?.data);
        }
      });
  }, [postId]);

  return { sharePost };
};

export default useShare;
