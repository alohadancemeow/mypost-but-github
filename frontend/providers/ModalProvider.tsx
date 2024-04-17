"use client";

import React, { useEffect, useState } from "react";

type Props = {};

const ModalProvider = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* <AuthModal /> */}
      {/* <PostModal /> */}
    </>
  );
};

export default ModalProvider;
