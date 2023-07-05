import { createSlice } from "@reduxjs/toolkit";
import { Friend, FriendStatus } from "../../utils/types";
import {
  acceptFriendThunk,
  getFriendsThunk,
  sendFriendRequestThunk,
} from "./friend.thunk";

type FriendState = {
  friends: Friend[];
  openFriendContainer: boolean;
  openFriendRequests: boolean;
};
const initialState: FriendState = {
  friends: [],
  openFriendContainer: false,
  openFriendRequests: false,
};

export const friend = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setOpenFriendContainer: (state, action) => {
      state.openFriendContainer = action.payload;
    },
    setOpenFriendRequests: (state, action) => {
      state.openFriendRequests = action.payload;
    },
    receivedFriendRequest: (state, action) => {
      const newArr = state.friends.concat(action.payload);
      state.friends = newArr;
    },
    friendAccepted: (state, action) => {
      const newArr = state.friends;
      const idx = newArr.findIndex((friend) => friend.id === action.payload.id);
      newArr[idx].status = FriendStatus.ACCEPTED;
      state.friends = newArr;
    },
    friendDeleted: (state, action) => {
      const newArr = state.friends;
      const idx = newArr.findIndex((friend) => friend.id === action.payload.id);
      newArr.splice(idx, 1);
      state.friends = newArr;
    },
  },
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
    builder.addCase(acceptFriendThunk.fulfilled, (state, action) => {
      console.log("acceptFriendThunk.fulfilled");
      const newArr = state.friends;
      const idx = newArr.findIndex((friend) => friend.id === action.payload.id);
      newArr[idx] = action.payload;
      state.friends = newArr;
    });
  },
});

export const {
  setOpenFriendContainer,
  receivedFriendRequest,
  setOpenFriendRequests,
  friendAccepted,
  friendDeleted,
} = friend.actions;

export default friend.reducer;
