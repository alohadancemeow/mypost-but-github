"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { signIn } from "next-auth/react";
import { trpc } from "@/utils/trpcClient";
import { toast } from "react-hot-toast";

import { Box, Text, FormControl, TextInput } from "@primer/react";
import {
  MailIcon,
  LockIcon,
  RocketIcon,
  MarkGithubIcon,
} from "@primer/octicons-react";
import { AiFillGoogleCircle } from "react-icons/ai";

import Modal from "../Modal";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";

const AuthModal = () => {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { isOpen, onClose, onOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const { mutateAsync } = trpc.user.createUser.useMutation({
    onError(error) {
      toast.error(error.message);
    },
  });

  // handle signup
  const onSignup = async () => {
    if (!user) return;

    try {
      const data = await mutateAsync({
        email: user.email,
        password: user.password,
      });

      if (data) {
        await onSignin();
      }
    } catch (error: any) {
      // console.log("onSignup err", error);
      // toast.error(error?.message!);
    }
  };

  // handle signin
  const onSignin = async () => {
    if (!user) return;

    const response = await signIn("credentials", {
      // redirect: false,
      // callbackUrl: `/`,
      email: user.email,
      password: user.password,
    });

    if (response?.error) {
      toast.error(response.error);
    }

    if (response?.ok) {
      toast.success("login successfully!");
      router.refresh();
      onClose();
    }
  };

  return (
    <Modal
      title={
        <Box display="flex" justifyContent={"center"} alignItems="center">
          <RocketIcon size={24} fill="white" />
          <Text
            as="p"
            sx={{
              fontWeight: "bold",
              color: "canvas.default",
              padding: "0 10px",
              fontSize: "18px",
            }}
          >
            Mypost but Github
          </Text>
        </Box>
      }
      description="Login to your account."
      isOpen={isOpen}
      onChange={onChange}
    >
      <Box
        margin={"auto"}
        width={"auto"}
        height={400}
        // border={"1px solid rgba(68, 76, 86, 1)"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <FormControl id="email">
            <FormControl.Label
              htmlFor="email"
              sx={{
                fontWeight: "500",
                color: "canvas.default",
              }}
            >
              Email
            </FormControl.Label>
            <TextInput
              // @ts-expect-error
              leadingVisual={<MailIcon />}
              aria-label="Email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="enter your email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </FormControl>
          <FormControl sx={{ margin: "10px" }} id="password">
            <FormControl.Label
              htmlFor="password"
              sx={{
                fontWeight: "500",
                color: "canvas.default",
              }}
            >
              Password
            </FormControl.Label>
            <TextInput
              // @ts-expect-error
              leadingVisual={<LockIcon />}
              aria-label="Password"
              type="password"
              name="password"
              autoComplete="password"
              placeholder="enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </FormControl>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width="242px"
            margin="15px 0"
          >
            <MyButton
              w="110px"
              // h="30px"
              rounded="4px"
              color="#06A833"
              onClick={() => {
                onSignin();
              }}
            >
              Sign in
            </MyButton>
            <MyButton
              w="110px"
              // h="30px"
              rounded="4px"
              color="#444C56"
              onClick={() => {
                onSignup();
              }}
            >
              Sign up
            </MyButton>
          </Box>

          <Box
            display={"flex"}
            justifyContent="center"
            alignItems="center"
            margin="15px 0"
          >
            <Line />
            <Text
              sx={{
                fontWeight: "bold",
                color: "canvas.default",
                margin: "0 15px",
                fontSize: "14px",
              }}
            >
              Or
            </Text>
            <Line />
          </Box>

          <Box display="flex" flexDirection="column" width="242px">
            <MyButton
              rounded="16px"
              h="34px"
              color="#f35656"
              onClick={() => signIn("google")}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginInlineStart: "15px",
                }}
              >
                <AiFillGoogleCircle size={18} />
                <Text
                  sx={{
                    marginInlineStart: "10px",
                    alignContent: "center",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Continue with google
                </Text>
              </div>
            </MyButton>
            <MyButton
              rounded="16px"
              h="34px"
              color="#444C56"
              gap="15px 0"
              onClick={() => {
                signIn("github");
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginInlineStart: "15px",
                }}
              >
                <MarkGithubIcon size={18} />
                <Text
                  sx={{
                    marginInlineStart: "10px",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Continue with Github
                </Text>
              </div>
            </MyButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;

type ButtonType = {
  color?: string;
  w?: string;
  h?: string;
  rounded?: string;
  gap?: string;
};

// Styled component
export const MyButton = styled.button<ButtonType>`
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  margin: ${({ gap: gab }) => gab};
  padding: 5px;
  font-weight: bold;
  text-decoration: none;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: ${({ rounded }) => rounded};
  background-color: ${({ color }) => (color ? color : "transparent")};

  &:hover {
    opacity: 0.7;
  }
`;

export const Line = styled.div`
  display: inline-block;
  width: 90px;
  height: 1px;
  background-color: #444c56;
`;
