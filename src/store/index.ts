import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authUserSlice from "./authUser/authUser.slice";
import friendSlice from "./friend/friend.slice";
import roomSlice from "./room/room.slice";

export const store = configureStore({
  reducer: {
    authUser: authUserSlice,
    friend: friendSlice,
    room: roomSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
