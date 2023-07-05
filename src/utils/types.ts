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

export type Conversation = {
  id: string;
  createdBy: Friend;
  friendId: string;
  messages: Message[];
  lastMessage: Message;
};

export type Message = {
  id: string;
  text: string;
  author: User;
  authorId: string;
  createdAt: Date;
  conversation: Conversation;
  conversationId: string;
  lastOfConversation: Conversation;
  lastOfConversationId: string;
};

export type CreateFirstMessageDto = {
  text: string;
  friendId: string;
};

export type LoadMoreMessagesDto = {
  conversationId: string;
  messageId: string;
};
