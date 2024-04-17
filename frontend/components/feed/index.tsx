"use client";

import styled from "styled-components";

import { Box } from "@primer/react";

import LeftContent from "./LeftContent";
import MainContent from "./mainContent/Main";
import RightContent from "./RightContent";

import { User } from "@clerk/nextjs/dist/types/server";
import { PostPopulated } from "@/types";
import usePostModal from "@/hooks/usePostModal";
// import NewEditor from "./mainContent/new-editor/new-editor";
import { useMemo } from "react";
import dynamic from "next/dynamic";

type Props = {
  currentUser?: User | null;
  users?: User[] | null;
  popularPosts: PostPopulated[];
};

const content = "";

const Feed = ({ currentUser, users, popularPosts }: Props) => {
  const NewEditor = useMemo(
    () =>
      dynamic(
        () => import("@/components/feed/mainContent/new-editor/new-editor"),
        { ssr: false }
      ),
    []
  );

  const { isOpen, onOpen, onClose } = usePostModal();

  console.log("open", isOpen);

  return (
    <>
      <div className="h-full w-full flex flex-col text-white">
        <div className="h-full w-full grid grid-cols-3 lg:grid-cols-4">
          <div className="col-span-1">
            <LeftContent users={users} posts={popularPosts} />
          </div>

          <div className="col-span-2">
            {isOpen ? (
              <NewEditor
                onChange={() => {}}
                initialContent={content}
                editable
              />
            ) : (
              <MainContent currentUser={currentUser} />
            )}
          </div>
          <div className="col-span-1 hidden lg:flex">
            <RightContent popularPosts={popularPosts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;

// responsive
const MyBox = styled(Box)`
  @media (max-width: 1200px) {
    display: grid;
    grid-template-columns: 1fr;
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    margin: 0;
    padding: 0;
  }
`;
