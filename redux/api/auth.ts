import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserState } from "../slice/user";

interface loginResult {
  msg: string;
  token: string;
  data: {
    name: string;
    userName: string;
    email: string;
    imageUri: string;
    emailIsVerified: boolean;
  };
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
