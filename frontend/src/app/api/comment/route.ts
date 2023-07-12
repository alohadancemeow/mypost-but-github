import getCurrentUser from "@/actions/getCurrentUser";
import  prisma  from "@/lib/prismadb";
import { CommentValidator } from "@/types";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const commentBody = await request.json();
    const { postId, body } = CommentValidator.parse(commentBody);

    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!existingPost) {
      throw new Error("Invalid ID");
    }

    const comment = await prisma.comment.create({
      data: {
        postId,
        body,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Could not create comment. Please try later", {
      status: 500,
    });
  }
}
