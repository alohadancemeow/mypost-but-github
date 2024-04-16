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
      size="small"
      fillColor="#444C56"
      style={{
        padding: "13px 20px",
        marginRight: "8px",
        marginBottom: "8px",
        fontSize: '14px',
        lineHeight: '20px'
      }}
    />
  );
};

export default Tag;
