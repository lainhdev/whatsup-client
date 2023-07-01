import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../utils/types";
import { getAuthUserThunk, updateAuthUserThunk } from "./authUser.thunk";

const initialState: User = {
  email: "",
  id: "",
  nickname: "",
  picture: "",
};

export const authUser = createSlice({
  name: "authUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthUserThunk.fulfilled, (state, action) => {
      console.log("getAuthUserThunk.fulfilled");
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.picture = action.payload.picture;
    });
    builder.addCase(updateAuthUserThunk.fulfilled, (state, action) => {
      console.log("updateAuthUserThunk.fulfilled");
      state.nickname = action.payload.nickname;
      state.picture = action.payload.picture;
    });
  },
});

export default authUser.reducer;
