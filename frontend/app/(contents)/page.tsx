import { clerkClient } from "@clerk/nextjs/server";
import getPopularPosts from "@/actions/getPopularPosts";

import LeftContent from "@/components/contents/LeftContent";
import MainContent from "@/components/contents/Main";
import RightContent from "@/components/contents/RightContent";
import PostBanner from "@/components/PostBanner";
import Feed from "@/components/Feed";
import PostDrawer from "@/components/PostDrawer";
import getPosts from "@/actions/get-posts";

type Props = {};

const page = async (props: Props) => {
  const users = await clerkClient.users.getUserList();
  const popularPosts = await getPopularPosts();
  const posts = await getPosts();

  return (
    <>
      <div className="col-span-1">
        <LeftContent
          users={JSON.parse(JSON.stringify(users.data))}
          posts={posts}
        />
      </div>
      <div className="col-span-2">
        <MainContent>
          <PostBanner />
          <Feed />
        </MainContent>
      </div>
      <div className="col-span-1 hidden lg:flex">
        <RightContent popularPosts={popularPosts} />
      </div>
    </>
  );
};

export default page;
