import { createSlice } from "@reduxjs/toolkit";
import { Friend } from "../../utils/types";

type RoomState = {
  isOpenRoom: boolean;
  currentRoom: Friend | null;
};
const initialState: RoomState = {
  isOpenRoom: false,
  currentRoom: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setIsOpenRoom: (state: RoomState, action) => {
      state.isOpenRoom = action.payload;
    },
    setCurrentRoom: (state: RoomState, action) => {
      state.currentRoom = action.payload;
    },
  },
});

export const { setIsOpenRoom, setCurrentRoom } = roomSlice.actions;

export default roomSlice.reducer;
