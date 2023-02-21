import { Prisma } from "@prisma/client";

// post response
export const postPopulated = Prisma.validator<Prisma.PostInclude>()({
  user: {
    select: {
      name: true,
    },
  },
  comments: true,
  likes: true,
  tags: true,
});

export type PostPopulated = Prisma.PostGetPayload<{
  include: typeof postPopulated;
}>;
