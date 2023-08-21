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
console.log("🚀 ~ file: services.ts:12 ~ persistedState:", persistedState);
const JSONpersistedState = persistedState ? JSON.parse(persistedState) : null;
const tokenFromState = JSONpersistedState?.user
  ? JSON.parse(JSONpersistedState?.user)?.token
  : null;
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
    uploadPhoto: builder.mutation<
      { photo: string },
      { mimeType: string; uri: string }
    >({
      query: (payload) => {
        const blob: any = {
          name: `${payload.uri.split("/").splice(-1)}`,
          type: payload.mimeType,
          uri: payload.uri,
        };
        const formData = new FormData();

        formData.append("photos", blob);
        return {
          url: "/upload-photos",
          method: "POST",
          body: formData,
          headers: {
            "Content-type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: ["post"],
    }),
    uploadAudio: builder.mutation<
      { audio: string },
      { mimeType: string; uri: string; name: string }
    >({
      query: (payload) => {
        console.log("🚀 ~ file: services.ts:60 ~ payloadAudio:", payload);
        const blob: any = {
          name: payload.name,
          type: payload.mimeType,
          uri: payload.uri,
        };
        const formData = new FormData();

        formData.append("audio", blob);
        return {
          url: "/upload-audio",
          method: "POST",
          body: formData,
          headers: {
            "Content-type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: ["post"],
    }),
    uploadVideo: builder.mutation<
      { video: "video.mp4" },
      { mimeType: string; uri: string }
    >({
      query: (payload) => {
        console.log("🚀 ~ file: services.ts:60 ~ payloadAudio:", payload);
        const blob: any = {
          name: `${payload.uri.split("/").splice(-1)}`,
          type: payload.mimeType,
          uri: payload.uri,
        };
        const formData = new FormData();

        formData.append("video", blob);
        return {
          url: "/upload-video",
          method: "POST",
          body: formData,
          headers: {
            "Content-type": "multipart/form-data",
          },
        };
      },
    }),
    postContent: builder.mutation<{ msg: string }, IPostContent>({
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

    getAllPosts: builder.query<{ posts: IPost[] }, null>({
      query: () => "/all-posts",
      providesTags: ["post"],
      extraOptions: { maxRetries: 2 },
    }),
    getRandomPosts: builder.query<{ posts: IPost[] }, null>({
      query: () => "/random-posts",
      extraOptions: { maxRetries: 2 },
    }),
  }),
});

export const {
  useUploadPhotoMutation,
  usePostContentMutation,
  useUploadAudioMutation,
  useUploadVideoMutation,
  useGetRandomPostsQuery,
  useLazyGetRandomPostsQuery,
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
} = servicesApi;
