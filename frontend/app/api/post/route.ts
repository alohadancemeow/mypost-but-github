import { db as prisma } from "@/lib/prismadb";
import { PostValidator } from "@/types";
import { auth } from "@clerk/nextjs";
import { Post } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  const { userId } = auth();

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const reqBody = await request.json();

    const { title, tag, body } = PostValidator.parse(reqBody);

    const post = await prisma.post.create({
      data: {
        userId,
        title,
        body,
        tag: tag ?? "",
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Could not create post. Please try later", {
      status: 500,
    });
  }
}
