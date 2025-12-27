import getPopularPosts from "@/actions/get-popular-posts";
import { clerkClient } from '@clerk/nextjs/server';
import LeftContent from "@/components/contents/LeftContent";
import MainContent from "@/components/contents/Main";
import RightContent from "@/components/contents/RightContent";
import Banner from "@/components/Banner";
import Feed from "@/components/Feed";
import getPosts from "@/actions/get-posts";
import Tabs from "@/components/Tabs";
import WhoToFollow from "@/components/WhoToFollow";

type Props = {};

const page = async (props: Props) => {
  // const client = await clerkClient();
  // const users = await client.users.getUserList();
  // const popularPosts = await getPopularPosts();
  // const posts = await getPosts();

  return (
    <MainContent>
      <Banner />
      <Tabs firstTab="For You" secondTab="Following" />
      <Feed />
      <WhoToFollow />
    </MainContent>
  );
};

export default page;
