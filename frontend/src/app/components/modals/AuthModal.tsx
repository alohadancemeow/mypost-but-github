"use client";

import React, { useCallback } from "react";
import styled from "styled-components";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

import { AiFillGoogleCircle } from "react-icons/ai";
import { Box, Text, FormControl, TextInput } from "@primer/react";
import {
  MailIcon,
  LockIcon,
  RocketIcon,
  MarkGithubIcon,
} from "@primer/octicons-react";

import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";

import { z } from "zod";
import axios, { AxiosError } from "axios";
import { UserValidator } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type UserInput = z.infer<typeof UserValidator>;

const AuthModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<UserInput>({
    resolver: zodResolver(UserValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = watch("email");
  const password = watch("password");

  // # Handle submit --> register
  const onSubmit: SubmitHandler<UserInput> = useCallback(
    async ({ email, password }) => {
      axios
        .post("api/register", {
          email,
          password,
        })
        .then((data) => {
          if (data.status === 200) {
            signIn("credentials", {
              email,
              password,
            });

            toast.success("Account created.");
            router.refresh();
            onClose();
          }
        })
        .catch((error) => {
          console.log(error);

          if (error instanceof AxiosError) {
            toast.error(error.response?.data);
          }
        });
    },
    [email, password]
  );

  // # Handle signin --> another submit
  const onSignin: SubmitHandler<UserInput> = useCallback(
    async ({ email, password }) => {
      try {
        const data = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (data?.error) {
          toast.error(data.error);
        } else {
          toast.success("login successfully!");
          router.refresh();
          onClose();
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      }
    },
    [email, password]
  );

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
          as={"form"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          onSubmit={handleSubmit(onSubmit)}
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
              // @ts-ignore
              leadingVisual={<MailIcon />}
              aria-label="Email"
              type="email"
              autoComplete="email"
              placeholder="enter your email"
              {...register("email")}
              aria-invalid={Boolean(errors.email)}
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
              // @ts-ignore
              leadingVisual={<LockIcon />}
              aria-label="Password"
              type="password"
              autoComplete="password"
              placeholder="enter your password"
              {...register("password")}
              aria-invalid={Boolean(errors.password)}
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
              onClick={handleSubmit(onSignin)}
              disabled={isSubmitting}
            >
              Sign in
            </MyButton>
            <MyButton
              type="submit"
              w="110px"
              // h="30px"
              rounded="4px"
              color="#444C56"
              disabled={isSubmitting}
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
  bordered?: boolean;
};

// Styled component
export const MyButton = styled.button<ButtonType>`
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  margin: ${({ gap: gab }) => gab};
  padding: 5px;
  font-weight: bold;
  text-decoration: none;
  /* border: none; */
  border: ${({ bordered }) => (bordered ? "1px solid #444c56" : "none")};
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
