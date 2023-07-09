'use server'

import { FormData } from "@/types";
import axios from "axios";
import { revalidatePath, revalidateTag } from "next/cache";

export const createPost = async (payload: FormData) => {
  // try {
  //   const data = await axios.post("/api/post", { ...payload })
  //   revalidateTag('posts')
  //   // revalidatePath('/')
  //   return {data}
  // } catch (error) {
  //   console.log(error, 'err in server');
  // }
}

export const revalidate = (tag: string)=> {
  revalidateTag(tag)
}