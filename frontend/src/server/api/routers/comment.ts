import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { commentPopulated } from "../../../../types/myTypes";

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
      const { id: userId } = session.user;

      try {
        await prisma.comment.create({
          data: {
            userId,
            postId,
            body,
          },
        });

        return true;
      } catch (error: any) {
        // console.log(error?.message);
        throw new TRPCError({code: 'BAD_REQUEST'});
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
