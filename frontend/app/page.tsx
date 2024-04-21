import Feed from "@/components/feed";
import getPopularPosts from "@/actions/getPopularPosts";

import { clerkClient } from "@clerk/nextjs";

type Props = {};

const page = async (props: Props) => {
  const users = await clerkClient.users.getUserList();
  const popularPosts = await getPopularPosts();

  return <Feed users={users} popularPosts={popularPosts} />;
};

export default page;
