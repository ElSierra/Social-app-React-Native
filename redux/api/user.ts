import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserState } from "../slice/user";
import { IGuestData, IUSerData, Notifications } from "../../types/api";
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
  tagTypes: ["user", "guest"],
  endpoints: (builder) => ({
    getUser: builder.query<{ data: IUSerData }, null>({
      query: () => "/get-user",
      providesTags: ["user"],
      extraOptions: { maxRetries: 2 },
    }),
    getGuest: builder.query<{ data: IGuestData }, { id: string }>({
      query: ({ id }) => `/get-guest?id=${id}`,
      providesTags: ["guest"],
      keepUnusedDataFor: 10,
    }),
    getNotifications: builder.query<{ notifications: Notifications[] },null>({
      query: () => `/get-notifications`,
      keepUnusedDataFor: 10,
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
    uploadProfilePicture: builder.mutation<
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

        formData.append("photo", blob);
        return {
          url: "/update-photo",
          method: "POST",
          body: formData,
          headers: {
            "Content-type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    updateNotificationId: builder.mutation<any, { notificationId: string }>({
      query: (payload) => {
        return {
          url: "/update-notification-id",
          method: "PUT",
          body: { notificationId: payload.notificationId },
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useTokenValidQuery,
  useLazyGetUserQuery,
  useGetGuestQuery,
  useLazyGetNotificationsQuery,
  useLazyGetGuestQuery,
  useGetNotificationsQuery,
  useUpdateNotificationIdMutation,
  useUploadProfilePictureMutation,
  useGetFollowDetailsQuery,
  useLazyGetFollowDetailsQuery,
} = userApi;
