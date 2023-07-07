import prisma  from "@/lib/prismadb";

const getPopularPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      comments: true,
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
