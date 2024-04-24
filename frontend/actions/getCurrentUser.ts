import { auth } from "@clerk/nextjs/server";

export default async function getCurrentUser() {
  try {
    const { userId } = auth();

    return userId;
  } catch (error: any) {
    return null;
  }
}
