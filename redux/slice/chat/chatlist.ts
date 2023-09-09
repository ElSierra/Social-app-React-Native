import { IChatList, IChatMessage } from "./../../../types/api";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialDummyChat } from "../../../data/chatDummyData";
import { ChatType } from "../../../types/app";
import { chatApi } from "../../api/chat";
import socket from "../../../util/socket";

export type ChatList = {
  data: IChatList[];
  error: any;
  loading: boolean;
};

const chatList = createSlice({
  name: "chatList",
  initialState: {
    data: [],
    error: null,
    loading: false,
  } as ChatList,
  reducers: {
    addToChatList: (state, action: PayloadAction<IChatList>) => {
      console.log("🚀 ~ file: chatlist.ts:23 ~ action:", action.payload);

      state.data = [action.payload, ...state.data];
      console.log("🚀 ~ file: chatlist.ts:23 ~ action:", state.data);
    },
    addNewChat: (
      state,
      action: PayloadAction<{ message: IChatMessage; chatId: string }>
    ) => {
      const chatIndex = state.data.findIndex(
        (chats) => chats.id === action.payload.chatId
      );

      if (chatIndex !== -1) {
        state.data[chatIndex].messages = [
          action.payload.message,
          ...state.data[chatIndex].messages,
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      chatApi.endpoints.getAllChats.matchFulfilled,
      (state, { payload }) => {
        const data = payload.chatList;
        state.data = data;
        state.error = null;
        state.loading = false;
      }
    );
    builder.addMatcher(
      chatApi.endpoints.getAllChats.matchPending,
      (state, { payload }) => {
        state.error = null;
        state.loading = true;
      }
    );
    builder.addMatcher(
      chatApi.endpoints.getAllChats.matchRejected,
      (state, { payload, error }) => {
        state.error = error;
        state.loading = false;
      }
    );
  },
});

export default chatList.reducer;
export const { addToChatList, addNewChat } = chatList.actions;
