import { IPost } from "../../../types/api";
import { createSlice } from "@reduxjs/toolkit";
import { postLists } from "../../../data/test";
import { servicesApi } from "../../api/services";

export type postState = {
  data: IPost[];
  error: any;
  loading: boolean;
};

const myPost = createSlice({
  name: "myPosts",
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
      servicesApi.endpoints.getMyPosts.matchFulfilled,
      (state, { payload }) => {
        const data = [...state.data, ...payload.posts];
        state.data = data;
        state.error = null;
        state.loading = false;
      }
    );
    builder.addMatcher(
      servicesApi.endpoints.getMyPosts.matchPending,
      (state, { payload }) => {
        state.error = null;
        state.loading = true;
      }
    );
    builder.addMatcher(
      servicesApi.endpoints.getMyPosts.matchRejected,
      (state, { payload, error }) => {
        state.error = error;
        state.loading = false;
      }
    );
  },
});

export default myPost.reducer;
export const { resetPost } = myPost.actions;
