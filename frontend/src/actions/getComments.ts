import  prisma  from "@/lib/prismadb";

const getComments = async (postId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: true,
      },
    });

    return comments;
  } catch (error: any) {
    console.log(error?.message);

    return [];
  }
};

export default getComments;
