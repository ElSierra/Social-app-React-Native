import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserState } from "../slice/user";
import {
  IChatList,
  IComment,
  IPerson,
  IPost,
  IPostContent,
  IUSerData,
} from "../../types/api";
import storage from "../storage";
import { RootState } from "../store";

interface loginResult {
  msg: string;
  token: string;
  data: IUSerData;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/api/chat`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      // If we have a token, set it in the header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["chats"],
  endpoints: (builder) => ({
    getAllChats: builder.query<{ chatList: IChatList[] }, null>({
      query: () => `/get-all-chats`,

      extraOptions: { maxRetries: 2 },
    }),
  }),
});

export const { useGetAllChatsQuery } = chatApi;
