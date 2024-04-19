import  {db as prisma}  from "../lib/prismadb";

const getComments = async (postId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        post: {
          select: {
            userId: true
          }
        }
      },
    });

    return comments;
  } catch (error: any) {
    console.log(error?.message);

    return [];
  }
};

export default getComments;
