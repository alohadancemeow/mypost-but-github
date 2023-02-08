import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import Feed from "../components/Feed";
import Auth from "../components/Auth";

const Home: NextPage = () => {
  const { data } = useSession();
  // console.log(data);

  return (
    <Layout>
      {!data ? <Feed /> : <Auth />}
    </Layout>
  );
};

export default Home;
