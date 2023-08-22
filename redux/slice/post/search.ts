import { IPost } from "./../../../types/api";
import { createSlice } from "@reduxjs/toolkit";
import { postLists } from "../../../data/test";
import { servicesApi } from "../../api/services";

export type postState = {
  data: IPost[];
  error: any;
  loading: boolean;
};

const searchPost = createSlice({
  name: "searchPost",
  initialState: {
    data: [],
    error: null,
    loading: false,
  } as postState,
  reducers: {
    addPost: () => {},
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      servicesApi.endpoints.getRandomPosts.matchFulfilled,
      (state, { payload }) => {
        state.data = payload.posts;
        state.error = null;
        state.loading = false;
      }
    );
    builder.addMatcher(
      servicesApi.endpoints.getRandomPosts.matchPending,
      (state, { payload }) => {
        state.data = [];
        state.error = null;
        state.loading = true;
      }
    );
    builder.addMatcher(
      servicesApi.endpoints.getRandomPosts.matchRejected,
      (state, { payload, error }) => {
        state.data = [];
        state.error = error;
        state.loading = false;
      }
    );

    builder.addMatcher(
      servicesApi.endpoints.searchPosts.matchFulfilled,
      (state, { payload }) => {
        state.data = payload.posts;
        state.error = null;
        state.loading = false;
      }
    );
    builder.addMatcher(
      servicesApi.endpoints.searchPosts.matchPending,
      (state, { payload }) => {
        state.data = [];
        state.error = null;
        state.loading = true;
      }
    );
    builder.addMatcher(
      servicesApi.endpoints.searchPosts.matchRejected,
      (state, { payload, error }) => {
        state.data = [];
        state.error = error;
        state.loading = false;
      }
    );
  },
});

export default searchPost.reducer;
