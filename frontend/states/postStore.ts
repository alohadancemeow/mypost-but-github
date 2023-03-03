import { create } from "zustand";
import { PostInput } from "../types/myTypes";

type PostStore = {
  isOpen: boolean;
  setIsOpen: () => void;

  postInput: PostInput;
  setPostInput: (postInput: PostInput) => void;
};

export const postStore = create<PostStore>((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),

  postInput: {
    title: "",
    body: "",
    tags: [],
  },
  setPostInput: (postInput) => {
    set((state) => ({
      postInput: {
        ...state.postInput,
        title: postInput.title,
        body: postInput.body,
        tags: postInput.tags,
      },
    }));
  },
}));
