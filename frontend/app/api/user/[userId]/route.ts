import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const user = await clerkClient.users.getUser(params.userId);

  return NextResponse.json(user);
}
