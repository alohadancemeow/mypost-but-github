import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

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
      console.log("tags", tags);

      // create post
      // @issue: createMany is not supported on SQLite unfortunately
      try {
        const newPost = await prisma.post.create({
          data: {
            title,
            body,
            userId,
            tags: {

            }
          },
        });

        return newPost;
      } catch (error: any) {
        console.log("create post err", error?.message);
        throw new TRPCError(error?.message);
      }
    }),
});
