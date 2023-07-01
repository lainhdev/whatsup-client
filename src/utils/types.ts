export type User = {
  email: string;
  id: string;
  nickname: string;
  picture: string;
};

export type UpdateUserDto = {
  nickname: string;
  picture: string;
};

export type SendFriendRequestDto = {
  email: string;
};

export type Friend = {
  id: string;
  sender: User;
  senderId: string;
  receiver: User;
  receiverId: string;
  status: FriendStatus;
};

export enum FriendStatus {
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
}
