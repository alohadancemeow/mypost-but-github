import { clerkClient } from "@clerk/nextjs/server";
import getPopularPosts from "@/actions/getPopularPosts";

import LeftContent from "@/components/LeftContent";
import MainContent from "@/components/Main";
import RightContent from "@/components/RightContent";
import PostBanner from "@/components/PostBanner";
import Feed from "@/components/Feed";
import PostDrawer from "@/components/PostDrawer";

type Props = {};

const page = async (props: Props) => {
  const users = await clerkClient.users.getUserList();
  const popularPosts = await getPopularPosts();

  return (
    <>
      <div className="col-span-1">
        <LeftContent
          users={JSON.parse(JSON.stringify(users.data))}
          posts={popularPosts}
        />
      </div>
      <div className="col-span-2">
        <MainContent>
          <PostBanner />
          <Feed />
          <PostDrawer />
        </MainContent>
      </div>
      <div className="col-span-1 hidden lg:flex">
        <RightContent popularPosts={popularPosts} />
      </div>
    </>
  );
};

export default page;
