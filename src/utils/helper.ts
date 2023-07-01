import { Friend } from "./types";

export const findObj = (userId: string, friend: Friend) => {
  if (friend.receiverId !== userId) return friend.receiver;
  return friend.sender;
};
