import { z } from "zod";
import { hash } from "bcrypt";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { email, password } = input;

      // hash passward
      const hashedPassword = await hash(password, 12);

      //create user
      try {
        const user = await prisma.user.create({
          data: {
            email,
            name: email,
            password: hashedPassword,
          },
        });

        return user;
      } catch (error: any) {
        // console.log(error?.message);
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),

  getUsers: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    return await prisma.user.findMany({
      include: {
        posts: true,
      },
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
    });
  }),
});
