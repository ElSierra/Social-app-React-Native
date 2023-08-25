import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserState } from "../slice/user";
import { IUSerData } from "../../types/api";
import storage from "../storage";
import { RootState } from "../store";

interface loginResult {
  msg: string;
  token: string;
  data: IUSerData;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/api/user`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      // If we have a token, set it in the header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUser: builder.query<{ data: IUSerData }, null>({
      query: () => "/get-user",
      providesTags: ["user"],
      extraOptions: { maxRetries: 2 },
    }),
    getFollowDetails: builder.query<
      { following: string; followers: string },
      null
    >({
      query: () => "/get-follows",
      providesTags: ["user"],
      extraOptions: { maxRetries: 2 },
    }),
    tokenValid: builder.query<{ msg: boolean }, null>({
      query: () => "/token-valid",
      providesTags: ["user"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetUserQuery,
  useTokenValidQuery,
  useLazyGetUserQuery,
  useGetFollowDetailsQuery,
  useLazyGetFollowDetailsQuery,
} = userApi;
