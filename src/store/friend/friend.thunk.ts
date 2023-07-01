import { SendFriendRequestDto } from "./../../utils/types";
import {
  acceptFriend,
  deleteFriend,
  getFriends,
  sendFriendRequest,
} from "./../../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendFriendRequestThunk = createAsyncThunk(
  "friend/sendFriendRequestThunk",
  async (params: SendFriendRequestDto) => {
    const { data } = await sendFriendRequest(params);
    return data;
  }
);

export const getFriendsThunk = createAsyncThunk(
  "friend/getFriendsThunk",
  async () => {
    const { data } = await getFriends();
    return data;
  }
);

export const deleteFriendThunk = createAsyncThunk(
  "friend/deleteFriendThunk",
  async (id: string) => {
    const { data } = await deleteFriend(id);
    return data;
  }
);

export const acceptFriendThunk = createAsyncThunk(
  "friend/acceptFriendThunk",
  async (id: string) => {
    const { data } = await acceptFriend(id);
    return data;
  }
);
