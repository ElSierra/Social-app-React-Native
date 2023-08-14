import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserState } from "../slice/user";
import { IUSerData } from "../../types/api";
import storage from "../storage";

interface loginResult {
  msg: string;
  token: string;
  data: IUSerData;
}
const persistedState = storage.getString("persist:root");
const JSONpersistedState = persistedState && JSON.parse(persistedState);
const tokenFromState = JSON.parse(JSONpersistedState?.user)?.token;
console.log("🚀 ~ file: auth.ts:9 ~ tokenFromState:", tokenFromState);

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/api/user`,
    prepareHeaders: (headers) => {
      const token = tokenFromState;
      // If we have a token, set it in the header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUser: builder.query<IUSerData, undefined>({
      query: () => "/get-user",
      providesTags: ["user"],
    }),
    tokenValid: builder.query<{msg:boolean}, undefined>({
        query: () => "/token-valid",
        providesTags: ["user"],
      }),
  }),
});

export const { useGetUserQuery,useTokenValidQuery } = userApi;
