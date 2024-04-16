'use server'

import { FormData, PostValidator } from "../types";
import axios from "axios";
import { revalidatePath, revalidateTag } from "next/cache";


import getCurrentUser from "./getCurrentUser";
import  prisma  from "../lib/prismadb";
import { z } from "zod";
import { Post } from "@prisma/client";
import { currentUser,auth } from "@clerk/nextjs";

export type ResponseData = {
  data: Post
  err: string
}

// create post
export const createPost = async (payload: FormData) => {
  try {
    // const currentUser = await getCurrentUser();
    // const user = await currentUser()
    const { user: currentUser, userId} = auth()
  
    if (!currentUser) {
      // return new Error("Unauthorized");
      return {err: "Unauthorized"} as ResponseData
    }
    
    const { title, tags, content } = PostValidator.parse(payload);
  
    const post = await prisma.post.create({
      data: {
        title,
        userId,
        body: content,
        tags: tags,
        shares: 0,
      },
    });

    revalidateTag('posts')
    // revalidatePath('/')

    return {data: post} as ResponseData
  } catch (error) {
    console.log(error);
    
    
    if (error instanceof z.ZodError) {
      // return new Response(error.message, { status: 400 });
      return {err: error.message} as ResponseData
    }

    // return new Response("Could not create post. Please try later", {
    //   status: 500,
    // });

    return {err: "Could not create post. Please try later"} as ResponseData
  }
}

// like post
export const like = async (postId: string) => {
  try {
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
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

    if (!post) throw new Error("Invalid ID");

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: {
          push: currentUser.id,
        },
      },
    });

    revalidateTag('posts')
    
  } catch (error) {
    console.log(error);
  }
}

// unlike
export const unlike = async (postId: string) => {
  try {
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
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

    if (!post) throw new Error("Invalid ID");
    
    let updatedLikedIds = [...(post.likedIds || [])];

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds.filter((userId) => userId !== currentUser.id),
      },
    });

    revalidateTag('posts')
  } catch (error) {
    console.log(error);
  }
}