"use client";

import styled from "styled-components";
import { RocketIcon, SignOutIcon } from "@primer/octicons-react";
import { Avatar, Box, Header, StyledOcticon, Text } from "@primer/react";
import { signOut } from "next-auth/react";

import { MyButton } from "@/app/components/modals/AuthModal";
import useAuthModal from "@/hooks/useAuthModal";
import { User } from "@prisma/client";

type Props = {
  currentUser?: User | null;
};

const Nav = ({ currentUser }: Props) => {
  const authModal = useAuthModal();

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
          href="#"
          sx={{ fontSize: "18px", textDecoration: "none", color: "white" }}
        >
          <StyledOcticon icon={RocketIcon} size={24} sx={{ mr: 2 }} />
          <Text fontSize={18} fontWeight={700}>
            Mypost but Github
          </Text>
        </Header.Link>
      </Header.Item>
      {currentUser ? (
        <Header.Item sx={{ mr: "0px" }}>
          <Header.Item>
            <MyText fontSize={16} fontWeight={400}>
              Signed in as {currentUser?.name ?? currentUser.email}
            </MyText>
          </Header.Item>
          <Avatar
            src={`${currentUser?.image ?? "https://github.com/octocat.png"}`}
            size={20}
            alt="@octocat"
          />
          <Box sx={{ cursor: "pointer" }} onClick={() => signOut()}>
            <StyledOcticon
              icon={SignOutIcon}
              size={16}
              sx={{ ml: "20px", cursor: "pointer" }}
            />
          </Box>
        </Header.Item>
      ) : (
        <Header.Item sx={{ mr: "0px" }}>
          <MyButton
            w="130px"
            h="32px"
            rounded="4px"
            bordered
            onClick={() => authModal.onOpen()}
          >
            Join Us ✌️🎉
          </MyButton>
        </Header.Item>
      )}
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
