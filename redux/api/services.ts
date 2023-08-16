import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserState } from "../slice/user";
import { IPost, IPostContent, IUSerData } from "../../types/api";
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

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/api/services`,
    prepareHeaders: (headers) => {
      const token = tokenFromState;
      // If we have a token, set it in the header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["post"],
  endpoints: (builder) => ({
    uploadPhoto: builder.mutation<{ photo: string }, any>({
      query: (payload) => ({
        url: "/upload-photos",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["post"],
    }),
    postContent: builder.mutation<{msg:string},IPostContent >({
      query: (payload) => ({
        url: "/post",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["post"],
    }),

    getAllPosts: builder.query<{posts:IPost[]}, null>({
      query: () => "/all-posts",
      providesTags: ["post"],
      extraOptions: { maxRetries: 2 },
    }),
    
  }),
});

export const { useUploadPhotoMutation,usePostContentMutation,useGetAllPostsQuery } = servicesApi;
