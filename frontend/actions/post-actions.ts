"use server";

import { db as prisma } from "@/lib/prismadb";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";

import { PostValidator } from "@/types";
import { revalidatePath } from "next/cache";

// export type ResponseData = {
//   data: Post;
//   errors: {
//     status: number;
//     message: string;
//   };
// };

// create post
export const createPost = async (postData: {
  title: string;
  tag: string;
  body: string;
}) => {
  const { userId } = await auth();

  try {
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { title, tag, body } = PostValidator.parse(postData);

    const post = await prisma.post.create({
      data: {
        userId,
        title,
        body,
        tag: tag ?? "",
      },
    });

    revalidatePath("/");

    return post;
  } catch (error) {
    if (error instanceof z.ZodError) throw new Error(error.message);
    throw error;
  }
};

// delete post
export const deletePost = async (postId: string) => {
  const { userId } = await auth();

  try {
    if (!userId) {
      throw new Error("Unauthorized");
    }

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw new Error("Post not found");


    // check if post belongs to user
    if (post.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    revalidatePath("/");

    return true
  } catch (error) {
    if (error instanceof z.ZodError) throw new Error(error.message);
    throw error;
  }
}


// like post
export const like = async (postId: string) => {
  const { userId } = await auth();

  try {
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!postId || typeof postId !== "string") {
      return new Response("Invalid ID", { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) return new Response("Post not found", { status: 404 });

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: {
          push: userId,
        },
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return new Response("[LIKE]: Internal server error", { status: 500 });
  }
};

// unlike
export const unlike = async (postId: string) => {
  const { userId } = await auth();

  try {
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!postId || typeof postId !== "string") {
      return new Response("Invalid ID", { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) return new Response("Post not found", { status: 404 });

    let updatedLikedIds = [...(post.likedIds || [])];

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds.filter((id) => id !== userId),
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return new Response("[UNLIKE]: Internal server error", { status: 500 });
  }
};

// Save post
export const save = async (postId: string) => {
  const { userId } = await auth();

  try {
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!postId || typeof postId !== "string") {
      return new Response("Invalid ID", { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) return new Response("Post not found", { status: 404 });

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        saveIds: {
          push: userId,
        },
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return new Response("[SAVE]: Internal server error", { status: 500 });
  }

  //   TODO: Notification here
};

// unsave
export const unsave = async (postId: string) => {
  const { userId } = await auth();

  try {
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!postId || typeof postId !== "string") {
      return new Response("Invalid ID", { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) return new Response("Post not found", { status: 404 });

    let updatedLikedIds = [...(post.likedIds || [])];

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        saveIds: updatedLikedIds.filter((id) => id !== userId),
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return new Response("[UNSAVE]: Internal server error", { status: 500 });
  }
};
