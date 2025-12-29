import getPopularPosts from "@/actions/get-popular-posts";
import { clerkClient } from '@clerk/nextjs/server';
import MainContentWrapper from "@/components/Wrapper";
import Banner from "@/components/Banner";
import Feed from "@/components/Feed";
import getPosts from "@/actions/get-user-stars";
import Tabs from "@/components/Tabs";
import WhoToFollow from "@/components/WhoToFollow";
import { Suspense } from "react";
import Skeleton from "@/components/Skeleton";

type Props = {};

const page = async (props: Props) => {
  // const client = await clerkClient();
  // const users = await client.users.getUserList();
  // const popularPosts = await getPopularPosts();
  // const posts = await getPosts();

  return (
    <MainContentWrapper>
      <Banner />
      <Tabs firstTab="For You" secondTab="Following" />
      <Suspense fallback={<Skeleton />}>
        <Feed />
      </Suspense>
      <WhoToFollow />
    </MainContentWrapper>
  );
};

export default page;
