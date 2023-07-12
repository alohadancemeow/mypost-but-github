"use client";

import React, { useEffect, useState } from "react";
import AuthModal from "@/app/components/modals/AuthModal";
import PostModal from "@/app/components/modals/PostModal";

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
