import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { postPopulated } from "../../../types/myTypes";

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
                  tags!.map((tag) => ({
                    body: tag,
                  })) ?? "Just sharing",
              },
            },
            shares: 0,
          },
        });

        return true;
      } catch (error: any) {
        // console.log("create post err", error?.message);
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),

  getPosts: protectedProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).default(5),
        orderBy: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { cursor, orderBy } = input;
      const limit = input.limit ?? 5;

      const posts = await prisma.post.findMany({
        include: postPopulated,
        orderBy:
          orderBy === "likes"
            ? {
                likes: {
                  _count: "desc",
                },
              }
            : {
                createdAt: "desc",
              },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (posts.length > limit) {
        const nextItem = posts.pop() as (typeof posts)[number];
        nextCursor = nextItem.id;
      }

      return { posts, nextCursor };
    }),

  like: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { postId } = input;
      const { id: userId } = session.user;

      try {
        await prisma.like.create({
          data: {
            post: {
              connect: {
                id: postId,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });

        return true;
      } catch (error: any) {
        // console.log(error?.message);
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),

  unlike: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { postId } = input;
      const { id: userId } = session.user;

      await prisma.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });

      return true;
    }),

  share: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { postId } = input;

      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          shares: {
            increment: 1,
          },
        },
      });

      return true;
    }),
});
