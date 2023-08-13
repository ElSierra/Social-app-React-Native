import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserState } from "../slice/user";
import { IUSerData } from "../../types/api";

interface loginResult {
  msg: string;
  token: string;
  data: IUSerData
}


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/api/auth`,
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    login: builder.mutation<
      loginResult,
      {
        userName: string;
        password: string;
      }
    >({
      query: (payload) => ({
        url: "/login",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
