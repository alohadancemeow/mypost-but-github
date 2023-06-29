import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { postPopulated } from "@/types/myTypes";

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

      // create post
      try {
        const post = await prisma.post.create({
          data: {
            title,
            body,
            authorId: userId,
            tags: tags?.map((item) => item) ?? [],
            shares: 0,
          },
        });

        return post;
      } catch (error: any) {
        console.log("create post err", error?.message);
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),

  getPosts: publicProcedure
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
                likedIds: "desc",
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
    .input(z.object({ postId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { postId, userId } = input;

      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // check if post is exist
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      // like --> update post by adding currentUserId
      try {
        const updatedPost = await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            likedIds: {
              push: userId,
            },
          },
        });

        //   TODO: Notification here

        return updatedPost;
      } catch (error: any) {
        // console.log(error?.message);
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),

  unlike: protectedProcedure
    .input(z.object({ postId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { postId, userId } = input;

      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // check if post is exist
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      let updatedLikedIds = [...(post.likedIds || [])];

      // unlike --> update post by deleting currentUserId
      const updatedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likedIds: updatedLikedIds.filter((id) => id !== userId),
        },
      });

      //   TODO: Notification here

      return updatedPost;
    }),

  share: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
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
