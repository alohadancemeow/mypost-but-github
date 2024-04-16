import {  currentUser } from "@clerk/nextjs";


export default async function getCurrentUser() {
  try {
  const user = await currentUser()

    return user;
  } catch (error: any) {
    return null;
  }
}
