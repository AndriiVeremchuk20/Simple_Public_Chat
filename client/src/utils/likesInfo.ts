import { Like } from "../types/Post";

export const isLiked = (
  userId: string|undefined,
  postId: string,
  likedList: Array<Like>
): boolean => {
  return  userId?likedList.some((like) => like.post === postId && like.user === userId):false;
};

export const numLikes = (postId: string, likedList: Array<Like>): number => {
  return likedList.filter((like) => like.post === postId).length;
};
