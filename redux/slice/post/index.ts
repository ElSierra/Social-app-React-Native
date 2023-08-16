import { IPost } from "./../../../types/api";
import { createSlice } from "@reduxjs/toolkit";
import { postLists } from "../../../data/test";
import { servicesApi } from "../../api/services";

export type postState = {
  data: IPost[];
  error: any;
  loading: boolean;
};

const post = createSlice({
  name: "post",
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
      servicesApi.endpoints.getAllPosts.matchFulfilled,
      (state, { payload }) => {
        state.data = payload.posts;
        state.error = null;
        state.loading = false;
      }
    );
    builder.addMatcher(
      servicesApi.endpoints.getAllPosts.matchPending,
      (state, { payload }) => {
        state.data = [];
        state.error = null;
        state.loading = true;
      }
    );
    builder.addMatcher(
      servicesApi.endpoints.getAllPosts.matchRejected,
      (state, { payload, error }) => {
        state.data = [];
        state.error = error;
        state.loading = false;
      }
    );
  },
});

export default post.reducer;
