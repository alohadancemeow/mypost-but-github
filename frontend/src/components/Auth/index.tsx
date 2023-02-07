import React from "react";
import styled, { css } from "styled-components";

import {
  Box,
  Text,
  FormControl,
  TextInput,
  Button,
  IconButton,
} from "@primer/react";
import {
  MailIcon,
  LockIcon,
  RocketIcon,
  MarkGithubIcon,
} from "@primer/octicons-react";
import { BsFacebook } from "react-icons/bs";

type Props = {};

const Auth = (props: Props) => {
  return (
    <Box bg={"canvas.bg"} height={"100vh"} display={"flex"}>
      <Box
        margin={"auto"}
        width={394}
        height={462}
        border={"1px solid rgba(68, 76, 86, 1)"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          // width='219px'
        >
          <Box
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            marginBottom={24}
          >
            <RocketIcon size={24} fill="white" />
            <Text
              as="p"
              sx={{
                fontWeight: "bold",
                color: "canvas.default",
                padding: "10px",
                fontSize: "18px",
              }}
            >
              Mypost but Github
            </Text>
          </Box>
          <FormControl>
            <FormControl.Label
              sx={{
                fontWeight: "bold",
                color: "canvas.default",
              }}
            >
              Email
            </FormControl.Label>
            <TextInput
              leadingVisual={MailIcon}
              aria-label="Email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="enter your email"
              // onChange={(e) => console.log(e.target.value)}
            />
          </FormControl>
          <FormControl sx={{ margin: "10px" }}>
            <FormControl.Label
              sx={{
                fontWeight: "bold",
                color: "canvas.default",
              }}
            >
              Password
            </FormControl.Label>
            <TextInput
              leadingVisual={LockIcon}
              aria-label="Password"
              type="password"
              name="password"
              autoComplete="password"
              placeholder="enter your password"
              // onChange={(e) => console.log(e.target.value)}
            />
          </FormControl>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width="242px"
            margin="15px 0"
          >
            <MyButton w="110px" h="30px" rounded="4px" color="#06A833">
              Sign in
            </MyButton>
            <MyButton w="110px" h="30px" rounded="4px" color="#444C56">
              Sign up
            </MyButton>
          </Box>

          <Box
            display={"flex"}
            justifyContent="center"
            alignItems="center"
            margin="15px 0"
            // border="1px solid red"
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
            <MyButton rounded="16px" h="34px" color="#2E89F1">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginInlineStart: "15px",
                }}
              >
                <BsFacebook size={18} />
                <Text
                  sx={{ marginInlineStart: "10px", alignContent: "center" }}
                >
                  Continue with Facebook
                </Text>
              </div>
            </MyButton>
            <MyButton rounded="16px" h="34px" color="#444C56" gab="15px 0">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginInlineStart: "15px",
                }}
              >
                <MarkGithubIcon size={18} />
                <Text sx={{ marginInlineStart: "10px" }}>
                  Continue with Github
                </Text>
              </div>
            </MyButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;

type ButtonType = {
  color: string;
  w?: string;
  h?: string;
  rounded?: string;
  gab?: string;
};

// Styled component
const MyButton = styled.button<ButtonType>`
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  margin: ${({ gab }) => gab};
  padding: 5px;
  font-weight: bold;
  text-decoration: none;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: ${({ rounded }) => rounded};
  background-color: ${({ color }) => color};

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
