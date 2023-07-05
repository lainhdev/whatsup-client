import { createSlice } from "@reduxjs/toolkit";
import { Conversation, Friend, Message } from "../../utils/types";
import {
  getConversationsThunk,
  loadMoreMessagesThunk,
} from "./conversation.thunk";

type ConversationState = {
  isOpenConversation: boolean;
  isOpenNewConversation: boolean;
  currentConversation: Conversation | null;
  isOpenVideoCall: boolean;
  callingRequestId: string;
  isCallingRequest: boolean;
  newConversation: Friend | null;
  conversations: Conversation[];
};
const initialState: ConversationState = {
  isOpenConversation: false,
  isOpenNewConversation: false,
  newConversation: null,
  isCallingRequest: false,
  callingRequestId: "",
  currentConversation: null,
  isOpenVideoCall: false,
  conversations: [],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setIsOpenConversation: (
      state: ConversationState,
      action: { payload: boolean }
    ) => {
      state.isOpenConversation = action.payload;
    },
    setIsOpenVideoCall: (state, action) => {
      state.isOpenVideoCall = action.payload;
    },
    setIsCallingRequest: (state, action) => {
      state.isCallingRequest = action.payload;
    },
    setCallingRequestId: (state, action) => {
      state.callingRequestId = action.payload;
    },
    setIsOpenNewConversation: (
      state: ConversationState,
      action: { payload: boolean }
    ) => {
      state.isOpenNewConversation = action.payload;
    },
    setCurrentConversation: (
      state: ConversationState,
      action: { payload: Conversation | null }
    ) => {
      state.currentConversation = action.payload;
    },
    setNewConversation: (
      state: ConversationState,
      action: { payload: Friend | null }
    ) => {
      state.newConversation = action.payload;
    },
    addConversation: (
      state: ConversationState,
      action: { payload: Conversation }
    ) => {
      const newArr = state.conversations;
      newArr.unshift(action.payload);
      state.conversations = newArr;
    },
    receivedMessage: (
      state: ConversationState,
      action: { payload: Message }
    ) => {
      const newArr = state.conversations;
      const idx = newArr.findIndex(
        (conversation) => conversation.id === action.payload.conversationId
      );
      newArr[idx].messages.unshift(action.payload);
      const cacheConversation = newArr[idx];
      newArr.splice(idx, 1);
      newArr.unshift(cacheConversation);
      state.conversations = newArr;
      if (state.currentConversation?.id === action.payload.conversationId) {
        state.currentConversation.messages.unshift(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConversationsThunk.fulfilled, (state, action) => {
      state.conversations = action.payload;
    });
    builder.addCase(loadMoreMessagesThunk.fulfilled, (state, action) => {
      const newArr = state.conversations;
      const idx = newArr.findIndex(
        (conversation) => conversation.id === state.currentConversation?.id
      );
      const cacheConversation = state.currentConversation;
      if (idx !== -1 && cacheConversation) {
        newArr[idx].messages = newArr[idx].messages.concat(action.payload);
        cacheConversation.messages = cacheConversation?.messages.concat(
          action.payload
        );
      }
      state.conversations = newArr;
      state.currentConversation = cacheConversation;
    });
  },
});

export const {
  setIsOpenConversation,
  setIsOpenNewConversation,
  setCurrentConversation,
  setNewConversation,
  addConversation,
  receivedMessage,
  setIsOpenVideoCall,
  setIsCallingRequest,
  setCallingRequestId,
} = conversationSlice.actions;

export default conversationSlice.reducer;
