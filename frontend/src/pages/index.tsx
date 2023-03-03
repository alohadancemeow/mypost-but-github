import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import Feed from "../components/Feed";
import Auth from "../components/Auth";

import { siteMetadata } from "../../site/siteMetadata";
import { NextSeo } from "next-seo";
import { userStore } from "../../states/userStore";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

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
              url:
                // "/login-page.png" ??
                "https://images.unsplash.com/photo-1522008342704-6b265b543c37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
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

      {status !== "loading" && (
        <Layout>{session ? <Feed session={session} /> : <Auth />}</Layout>
      )}
    </>
  );
};

export default Home;
