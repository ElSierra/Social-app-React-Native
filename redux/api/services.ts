import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserState } from "../slice/user";
import {
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

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/api/services`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
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
      {
        photo: {
          uri: string;
          width: number;
          height: number;
        };
      },
      { mimeType: string; uri: string }
    >({
      query: (payload) => {
        const blob: any = {
          name: `${payload.uri.split("/").splice(-1)}`,
          type: payload.mimeType,
          uri: payload.uri,
        };
        const formData = new FormData();

        formData.append("photo", blob);
        return {
          url: "/upload-photo",
          method: "POST",
          body: formData,
          headers: {
            "Content-type": "multipart/form-data",
          },
        };
      },
  
    }),

    uploadAudio: builder.mutation<
      { audio: string },
      { mimeType: string; uri: string; name: string }
    >({
      query: (payload) => {
        console.log("🚀 ~ file: services.ts:70 ~ payload:", payload)
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
      { video: string; thumbNail: string },
      { mimeType: string; uri: string }
    >({
      query: (payload) => {
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

    getAllPosts: builder.query<
      { posts: IPost[] },
      { take: number; skip: number }
    >({
      query: ({ take, skip }) => `/all-posts?take=${take}&skip=${skip}`,
      providesTags: ["post"],
      extraOptions: { maxRetries: 2 },
    }),
    getSinglePost: builder.query<{ posts: IPost }, { id: string }>({
      query: ({ id }) => `/single-post?id=${id}`,
      extraOptions: { maxRetries: 2 },
    }),
    getRandomPosts: builder.query<{ posts: IPost[] }, null>({
      query: () => "/random-posts",
      extraOptions: { maxRetries: 2 },
    }),
    getRandomPeople: builder.query<{ people: IPerson[] }, null>({
      query: () => "/random-people",
      extraOptions: { maxRetries: 2 },
    }),
    searchPosts: builder.query<{ posts: IPost[] }, { q: string }>({
      query: ({ q }) => `/search-posts?q=${q}`,
      extraOptions: { maxRetries: 0 },
    }),
    searchPeople: builder.query<{ people: IPerson[] }, { q: string }>({
      query: ({ q }) => `/search-people?q=${q}`,
      extraOptions: { maxRetries: 0 },
    }),
    followUser: builder.query<{ msg: string }, { id: string }>({
      query: ({ id }) => `/follow?id=${id}`,
      extraOptions: { maxRetries: 0 },
    }),

    likePost: builder.query<{ msg: string }, { id: string }>({
      query: ({ id }) => `/like-post?id=${id}`,
      extraOptions: { maxRetries: 2 },
    }),
    postComment: builder.mutation<
      { msg: string },
      { id: string; comment: string }
    >({
      query: (payload) => ({
        url: "/post-comment",
        method: "POST",

        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    getCommentByPost: builder.query<{ comment: IComment[] }, { id: string }>({
      query: ({ id }) => `/get-postComment?id=${id}`,
      extraOptions: { maxRetries: 2 },
    }),
    getFollowedPosts: builder.query<
      { posts: IPost[] },
      { take: number; skip: number }
    >({
      query: ({ take, skip }) => `/followed-posts?take=${take}&skip=${skip}`,

      extraOptions: { maxRetries: 2 },
    }),
    getMyPosts: builder.query<
      { posts: IPost[] },
      { take: number; skip: number }
    >({
      query: ({ take, skip }) => `/my-posts?take=${take}&skip=${skip}`,

      extraOptions: { maxRetries: 2 },
    }),
    getGuestPosts: builder.query<
      { posts: IPost[] },
      { take: number; skip: number; id: string }
    >({
      query: ({ take, skip, id }) =>
        `/guest-posts?id=${id}&take=${take}&skip=${skip}`,

      extraOptions: { maxRetries: 2 },
    }),
    repost: builder.query<{ msg: string }, { id: string }>({
      query: ({ id }) => `/re-post?id=${id}`,
    }),
    deletePostById: builder.mutation<
      { msg: string },
      {
        id: string;
      }
    >({
      query: ({ id }) => {
        return {
          url: "/delete-post",
          method: "DELETE",
          body: { id },
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
  }),
});

export const {
  useUploadPhotoMutation,
  usePostContentMutation,
  useUploadAudioMutation,
  useUploadVideoMutation,
  useLazySearchPeopleQuery,
  useLazyGetGuestPostsQuery,
  useGetRandomPostsQuery,
  useLazyGetRandomPostsQuery,
  useGetAllPostsQuery,
  useLazyGetFollowedPostsQuery,
  useGetRandomPeopleQuery,
  useLazyFollowUserQuery,
  useGetMyPostsQuery,
  useLazyGetMyPostsQuery,
  useLazyLikePostQuery,
  useLazyGetSinglePostQuery,
  usePostCommentMutation,
  useLazySearchPostsQuery,
  useGetCommentByPostQuery,
  useLazyRepostQuery,
  useLazyGetCommentByPostQuery,
  useLazyGetAllPostsQuery,
  useDeletePostByIdMutation,
} = servicesApi;
