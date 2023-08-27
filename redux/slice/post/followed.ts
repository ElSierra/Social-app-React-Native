import { IPost } from "./../../../types/api";
import { createSlice } from "@reduxjs/toolkit";
import { postLists } from "../../../data/test";
import { servicesApi } from "../../api/services";

export type postState = {
  data: IPost[];
  error: any;
  loading: boolean;
};

const fPost = createSlice({
  name: "fPost",
  initialState: {
    data: [],
    error: null,
    loading: false,
  } as postState,
  reducers: {
    addPost: () => {},
    resetPost: (state) => {
      state.data = [];
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      servicesApi.endpoints.getFollowedPosts.matchFulfilled,
      (state, { payload }) => {
        const data = [...state.data, ...payload.posts];
        state.data = data;
        state.error = null;
        state.loading = false;
      }
    );
    builder.addMatcher(
      servicesApi.endpoints.getFollowedPosts.matchPending,
      (state, { payload }) => {
        state.error = null;
        state.loading = true;
      }
    );
    builder.addMatcher(
      servicesApi.endpoints.getFollowedPosts.matchRejected,
      (state, { payload, error }) => {
        state.error = error;
        state.loading = false;
      }
    );
  },
});

export default fPost.reducer;
export const { resetPost } = fPost.actions;
