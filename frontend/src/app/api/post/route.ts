import getCurrentUser from "@/actions/getCurrentUser";
import  prisma  from "@/lib/prismadb";
import { PostValidator } from "@/types";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    // console.log(body, "body");

    const { title, tags, content } = PostValidator.parse(body);

    const post = await prisma.post.create({
      data: {
        title,
        authorId: currentUser.id,
        body: content,
        tags: tags,
        shares: 0,
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
