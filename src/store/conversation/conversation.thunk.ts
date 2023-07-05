import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConversations, loadMoreMessages } from "../../utils/api";
import { LoadMoreMessagesDto } from "../../utils/types";

export const getConversationsThunk = createAsyncThunk(
  "conversation/getConversationsThunk",
  async () => {
    const { data } = await getConversations();
    return data;
  }
);

export const loadMoreMessagesThunk = createAsyncThunk(
  "conversation/loadMoreMessagesThunk",
  async (params: LoadMoreMessagesDto) => {
    const { data } = await loadMoreMessages(params);
    return data;
  }
);
