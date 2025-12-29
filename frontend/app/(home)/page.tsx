import MainContentWrapper from "@/components/Wrapper";
import Banner from "@/components/Banner";
import Feed from "@/components/Feed";
import Tabs from "@/components/Tabs";
import WhoToFollow from "@/components/WhoToFollow";
import { Suspense } from "react";
import Skeleton from "@/components/Skeleton";

const page = async () => {
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
