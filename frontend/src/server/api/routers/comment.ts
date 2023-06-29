import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { commentPopulated } from "@/types/myTypes";

export const commentRouter = createTRPCRouter({
  createComment: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        body: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { body, postId } = input;

      // issue: ID in session is missing
      if (!session.user.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const { id: userId } = user;

      try {
        const comment = await prisma.comment.create({
          data: {
            userId,
            postId,
            body,
          },
        });

        return comment;
      } catch (error: any) {
        // console.log(error?.message);
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),

  getComments: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { postId } = input;

      return await prisma.comment.findMany({
        where: {
          postId,
        },
        include: commentPopulated,
      });
    }),
});
