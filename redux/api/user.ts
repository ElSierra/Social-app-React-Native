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
console.log("🚀 ~ file: services.ts:12 ~ persistedState:", persistedState)
const JSONpersistedState = persistedState? JSON.parse(persistedState): null
const tokenFromState = JSONpersistedState?.user ?(JSON.parse(JSONpersistedState?.user)?.token):null
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
    getUser: builder.query<IUSerData, null>({
      query: () => "/get-user",
      providesTags: ["user"],
      extraOptions: { maxRetries: 2 },
    }),
    tokenValid: builder.query<{msg:boolean}, null>({
        query: () => "/token-valid",
        providesTags: ["user"],
        extraOptions: { maxRetries: 0 },
      }),
  }),
});

export const { useGetUserQuery,useTokenValidQuery } = userApi;
