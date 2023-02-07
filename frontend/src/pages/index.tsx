import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import Feed from "../components/Feed";
import Auth from "../components/Auth";

import { BaseStyles } from "@primer/react";

const Home: NextPage = () => {
  const { data } = useSession();
  // console.log(data);

  return (
    <Layout>
      <BaseStyles>{data ? <Feed /> : <Auth />}</BaseStyles>
    </Layout>
  );
};

export default Home;
