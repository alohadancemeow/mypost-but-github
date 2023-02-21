import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { postPopulated } from "../../../../types/myTypes";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { title, body, tags } = input;
      const { id: userId } = session.user;

      // create post
      // @issue: createMany is not supported on SQLite unfortunately
      try {
        await prisma.post.create({
          data: {
            title,
            body,
            userId,
            tags: {
              createMany: {
                data:
                  tags!!.map((tag) => ({
                    body: tag,
                  })) ?? "Just sharing",
              },
            },
          },
        });

        return true;
      } catch (error: any) {
        console.log("create post err", error?.message);
        throw new TRPCError(error?.message);
      }
    }),

  getPosts: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    return await prisma.post.findMany({
      include: postPopulated,
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
