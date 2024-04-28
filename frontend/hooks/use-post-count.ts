import { useEffect, useState } from "react";
import { Post } from "@prisma/client";

type Props = {
  posts: Post[];
};

const usePostCount = ({ posts }: Props) => {
  const [userPostCount, setUserPostCount] = useState<{
    [userId: number]: number;
  }>({});
  // const [userPostSavedCount, setUserSavedPostCount] = useState<{
  //   [userId: number]: number;
  // }>({});

  // Count the number of posts for each user
  useEffect(() => {
    const countPosts = () => {
      const counts: { [userId: number]: number } = {};
      const savedCounts: { [userId: number]: number } = {};

      posts.forEach((post) => {
        counts[post.userId] = (counts[post.userId] || 0) + 1;
        // post.saveIds.forEach((id) => {
        //   savedCounts[id] = (savedCounts[post.saveIds[post.userId]] || 0) + 1;
        // });
      });
      setUserPostCount(counts);
      // setUserSavedPostCount(savedCounts);
    };

    countPosts();
  }, [posts]);

  // return useMemo(() => ({ userPostCount }), [posts]);
  return {
    userPostCount,
    //  userPostSavedCount
  };
};

export default usePostCount;
