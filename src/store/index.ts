import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authUserSlice from "./authUser/authUser.slice";
import friendSlice from "./friend/friend.slice";
import conversaionSlice from "./conversation/conversation.slice";

export const store = configureStore({
  reducer: {
    authUser: authUserSlice,
    friend: friendSlice,
    conversation: conversaionSlice,
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
