import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hash } from "bcrypt";
import { UserValidator } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = UserValidator.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse("Email is taken!", { status: 409 });
    }

    //   hash password
    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new NextResponse("Could not create user. Please try later", {
      status: 500,
    });
  }
}
