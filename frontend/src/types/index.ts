import { Post, Prisma, User } from "@prisma/client";
import { z } from "zod";

// post response
export const postPopulated = Prisma.validator<Prisma.PostInclude>()({
  user: {
    select: {
      name: true,
      image: true,
    },
  },
  comments: {
    include: {
      user: true
    }
  },
});

export type PostPopulated = Prisma.PostGetPayload<{
  include: typeof postPopulated;
}>;

// comments
export const commentPopulated = Prisma.validator<Prisma.CommentInclude>()({
  user: {
    select: {
      name: true,
      image: true,
    },
  },
});

export type CommentPopulated = Prisma.CommentGetPayload<{
  include: typeof commentPopulated;
}>;

// # Validator types
export const UserValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const PostValidator = z.object({
  title: z.string(),
  content: z.any(),
  tags: z.array(z.string()),
});

export const CommentValidator = z.object({
  postId: z.string(),
  body: z.string(),
});


// # Response type
export type UserWithPost = User & {
  posts: Post[];
};

export type FormData = z.infer<typeof PostValidator>;
export type CommentInput = z.infer<typeof CommentValidator>