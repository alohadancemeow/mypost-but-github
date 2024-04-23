import Feed from "@/components/feed";
import getPopularPosts from "@/actions/getPopularPosts";

import { clerkClient } from "@clerk/nextjs/server";

type Props = {};

const page = async (props: Props) => {
  const users = await clerkClient.users.getUserList();
  const popularPosts = await getPopularPosts();

  return (
    <Feed
      users={JSON.parse(JSON.stringify(users.data))}
      popularPosts={popularPosts}
    />
  );
};

export default page;
