"use client";

import styled from "styled-components";
import { RocketIcon, SignOutIcon } from "@primer/octicons-react";
import { Avatar, Box, Header, StyledOcticon, Text } from "@primer/react";

import { MyButton } from "./modals/AuthModal";
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type Props = {};

const Nav = (props: Props) => {
  const {user} = useUser()
  const router = useRouter()

  return (
    <MyHeader
      sx={{
        bg: "canvas.primary",
        height: "65px",
        padding: "0 5rem",
        color: "white",
        zIndex: "1",
        borderBottom: "1px solid #444C56",
      }}
    >
      <Header.Item full>
        <Header.Link
          // href="/"
          onClick={()=> router.push('/')}
          sx={{ fontSize: "18px", textDecoration: "none", color: "white" }}
        >
          <StyledOcticon icon={RocketIcon} size={24} sx={{ mr: 2 }} />
          <Text fontSize={18} fontWeight={700}>
            Mypost but Github
          </Text>
        </Header.Link>
      </Header.Item>

      {user && (
        <Header.Item sx={{ mr: "0px" }}>
          <Header.Item>
            <MyText fontSize={16} fontWeight={400}>
              {`${user.fullName ?? user.primaryEmailAddress}`}
            </MyText>
          </Header.Item>
        </Header.Item>
      ) 
    }
     
       <SignedIn>
          <UserButton afterSignOutUrl="/"/>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <MyButton
             w="130px"
             h="32px"
             rounded="4px"
             bordered
            //  onClick={() => authModal.onOpen()}
           >
             Join Us ✌️🎉
           </MyButton>
           </SignInButton>
        </SignedOut>
    </MyHeader>
  );
};

export default Nav;

// responsive
const MyHeader = styled(Header)`
  @media (max-width: 768px) {
    padding: 0 2.5rem;
  }

  @media (max-width: 544px) {
    padding: 0 1rem;

    * {
      font-size: 14px;
    }
  }
`;
const MyText = styled(Text)`
  @media (max-width: 544px) {
    display: none;
  }
`;
