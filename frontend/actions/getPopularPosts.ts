import {db as prisma}  from "../lib/prismadb";

const getPopularPosts = async () => {
  const posts = await prisma.post.findMany({
   
    include: {
      comments: {
        select: {
          userId: true,
          body: true,
          id: true
        }
      }
    },
    orderBy: [
      { likedIds: "desc" },
      { shares: "desc" },
      {
        comments: {
          _count: "desc",
        },
      },
    ],
    take: 5,
  });

  return posts;
};

export default getPopularPosts;
