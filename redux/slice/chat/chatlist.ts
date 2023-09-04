import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialDummyChat } from "../../../data/chatDummyData";
import { ChatType } from "../../../types/app";

export type ChatList = {
  data: ChatType[];
};

const chatList = createSlice({
  name: "bottomSheet",
  initialState: {
    data: initialDummyChat,
  } as ChatList,
  reducers: {
    addToChatList: (
      state,
      action: PayloadAction<{
        id: string;
        user: {
          id: string;
          imageUri: string;
          name: string;
          userName: string;
        };
        messages: [{ id: string; text: string; time: string; userId: string }];
      }>
    ) => {
      state.data.push(action.payload);
    },
  },
});

export default chatList.reducer;
export const { addToChatList } = chatList.actions;
