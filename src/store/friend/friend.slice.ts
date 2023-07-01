import { createSlice } from "@reduxjs/toolkit";
import { Friend } from "../../utils/types";
import {
  acceptFriendThunk,
  deleteFriendThunk,
  getFriendsThunk,
  sendFriendRequestThunk,
} from "./friend.thunk";

type FriendState = {
  friends: Friend[];
};
const initialState: FriendState = {
  friends: [],
};

export const friend = createSlice({
  name: "friend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFriendsThunk.fulfilled, (state, action) => {
      console.log("getFriendsThunk.fulfilled");
      state.friends = action.payload;
    });
    builder.addCase(sendFriendRequestThunk.fulfilled, (state, action) => {
      console.log("sendFriendRequestThunk.fulfilled");
      const newArr = state.friends.concat(action.payload);
      state.friends = newArr;
    });
    builder.addCase(deleteFriendThunk.fulfilled, (state, action) => {
      console.log("deleteFriendThunk.fulfilled");
      const newArr = state.friends;
      const idx = newArr.findIndex((friend) => friend.id === action.payload.id);
      newArr.splice(idx, 1);
      state.friends = newArr;
    });
    builder.addCase(acceptFriendThunk.fulfilled, (state, action) => {
      console.log("acceptFriendThunk.fulfilled");
      const newArr = state.friends;
      const idx = newArr.findIndex((friend) => friend.id === action.payload.id);
      newArr[idx] = action.payload;
      state.friends = newArr;
    });
  },
});

export default friend.reducer;
