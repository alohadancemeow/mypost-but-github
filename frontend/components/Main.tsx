import React from "react";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

const MainContent = ({ children }: Props) => {
  return (
    <div
      style={{
        position: "-webkit-sticky",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className="rounded-sm p-10">{children}</div>
      <Footer />
    </div>
  );
};

export default MainContent;
