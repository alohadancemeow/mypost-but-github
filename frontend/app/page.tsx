import Feed from "@/components/feed";
import getPopularPosts from "@/actions/getPopularPosts";

import { clerkClient, currentUser } from "@clerk/nextjs";

type Props = {};

const page = async (props: Props) => {
  const user = await currentUser();
  const users = await clerkClient.users.getUserList();
  const popularPosts = await getPopularPosts();

  return (
    <>
      <Feed currentUser={user} users={users} popularPosts={popularPosts} />
    </>
  );
};

export default page;
