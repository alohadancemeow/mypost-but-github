import type { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../env.mjs";
import { prisma } from "./db";
import { compare } from "bcrypt";

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    /**
     * "No session is returned after Credentials login"
     * @solution https://github.com/nextauthjs/next-auth/discussions/4144
     */

    async jwt({ token, user }) {
      if (user) {
        // token = user;
        token = { ...user };
      }
      return Promise.resolve(token);
    },

    async session({ session, token, user }) {
      const sessionUser = { ...session.user, ...user, ...token };

      return Promise.resolve({
        ...session,
        user: sessionUser,
      });
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        // email: { label: "Email", type: "text" },
        // password: { label: "Password", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // find user by email
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          console.log("User not found");
          throw new Error("User not found");
        }

        // compare password
        const checkedPassword = await compare(password, user.password!!);

        if (!checkedPassword || user.email !== email) {
          throw new Error("email or password invalid");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
