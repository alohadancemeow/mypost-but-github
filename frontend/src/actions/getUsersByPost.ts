import  prisma  from "@/lib/prismadb";

const getUsersByPost = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
    });

    return users;
  } catch (error) {
    return [];
  }
};

export default getUsersByPost;
