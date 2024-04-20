import { db as prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// like
export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { postId } = params;

  if (!postId || typeof postId !== "string") {
    throw new Error("Invalid ID");
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw new Error("Invalid ID");

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: {
          push: userId,
        },
      },
    });

    //   TODO: Notification here

    return NextResponse.json(updatedPost);
  } catch (error) {
    return new Response("Something went wrong. Please try later", {
      status: 500,
    });
  }
}

// unlike
export async function DELETE(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { postId } = params;

  if (!postId || typeof postId !== "string") {
    throw new Error("Invalid ID");
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid ID");
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds.filter((id) => id !== userId),
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    return new Response("Something went wrong. Please try later", {
      status: 500,
    });
  }
}
