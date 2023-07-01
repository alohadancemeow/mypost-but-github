"use client";

import React, { useEffect, useState } from "react";
import AuthModal from "@/components/Modal/AuthModal";
import PostModal from "@/components/Modal/PostModal";

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
      <AuthModal />
      <PostModal />
    </>
  );
};

export default ModalProvider;
