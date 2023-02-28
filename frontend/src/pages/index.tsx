import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import Feed from "../components/Feed";
import Auth from "../components/Auth";

import { siteMetadata } from "../../site/siteMetadata";
import { NextSeo } from "next-seo";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  // console.log("session", session);

  return (
    <>
      <NextSeo
        title={`${siteMetadata.homeTitle}`}
        description={siteMetadata.description}
        canonical={siteMetadata.siteAddress}
        openGraph={{
          url: `${siteMetadata.siteAddress}`,
          title: `${siteMetadata.homeTitle}`,
          description: `${siteMetadata.description}`,
          images: [
            {
              url: "/login-page.png",
              width: 800,
              height: 600,
              alt: "home page",
              type: "image/png",
            },
            // { url: '/assets/site/home-light.svg' },
          ],
          site_name: `${siteMetadata.title}`,
        }}
        twitter={{
          handle: `${siteMetadata.twitter}`,
          site: `${siteMetadata.twitter}`,
          cardType: "summary_large_image",
        }}
      />
      {status === "authenticated" && (
        <Layout>{session ? <Feed session={session} /> : <Auth />}</Layout>
      )}
    </>
  );
};

export default Home;
