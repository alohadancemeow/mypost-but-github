'use client'

import React from "react";
import { IssueLabelToken } from "@primer/react";

type Props = {
  text: string;
};

const Tag = ({ text }: Props) => {
  return (
    <IssueLabelToken
      text={`${text}`}
      size="large"
      fillColor="#444C56"
      style={{
        padding: "13px 20px",
        marginRight: "8px",
        marginBottom: "8px",
      }}
    />
  );
};

export default Tag;
