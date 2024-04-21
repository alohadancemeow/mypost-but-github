import axios from "axios";
import { User } from "@clerk/nextjs/dist/types/server";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {
  userId: string;
};

export const useGetUser = ({ userId }: Props) => {
  //   const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["fetct-user"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/user/${userId}`);
      return data as User;
    },
  });

  return { data, isFetching };
};
