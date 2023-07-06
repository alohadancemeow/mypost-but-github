import getCurrentUser from "@/actions/getCurrentUser";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

// like
export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
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
          push: currentUser.id,
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
  const currentUser = await getCurrentUser();

  if (!currentUser) {
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
        likedIds: updatedLikedIds.filter((userId) => userId !== currentUser.id),
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    return new Response("Something went wrong. Please try later", {
      status: 500,
    });
  }
}

// # share
export async function PATCH(
  request: Request,
  { params }: { params: { postId: string } }
) {
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

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        shares: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    return new Response("Something went wrong. Please try later", {
      status: 500,
    });
  }
}
