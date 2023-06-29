import { Prisma } from "@prisma/client";

// post response
export const postPopulated = Prisma.validator<Prisma.PostInclude>()({
  user: {
    select: {
      name: true,
      image: true,
    },
  },
  comments: true,
});

export type PostPopulated = Prisma.PostGetPayload<{
  include: typeof postPopulated;
}>;

// post input
export const tokens = [
  { text: "Programming", id: 0 },
  { text: "Education", id: 1 },
  { text: "Just Sharing", id: 2 },
  { text: "Review", id: 3 },
];

export type PostInput = {
  title: string;
  body: string;
  tags: typeof tokens;
};

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
