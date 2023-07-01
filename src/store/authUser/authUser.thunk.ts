import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthUser, updateAuthUser } from "../../utils/api";
import { UpdateUserDto } from "../../utils/types";

export const getAuthUserThunk = createAsyncThunk(
  "authUser/getAuthUserThunk",
  async () => {
    const { data } = await getAuthUser();
    return data;
  }
);
export const updateAuthUserThunk = createAsyncThunk(
  "authUser/updateAuthUserThunk",
  async (params: UpdateUserDto) => {
    const { data } = await updateAuthUser(params);
    return data;
  }
);
