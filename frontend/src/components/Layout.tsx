import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { siteMetadata } from "../../site/siteMetadata";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const Layout = ({ children, title }: Props) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default Layout;
