import { createSlice } from "@reduxjs/toolkit";

import { userApi } from "../../api/user";

export interface FollowerState {
  data: { following: string; followers: string } | null;
  error: any;
  loading: boolean;
}
const followsCount = createSlice({
  name: "followsCount",
  initialState: {
    data: null,
    error: null,
    loading: false,
  } as FollowerState,
  reducers: {
    resetFollowers: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getFollowDetails.matchFulfilled,
      (state, { payload }) => {
        state.data = payload;
        state.error = null;
        state.loading = false;
      }
    );
    builder.addMatcher(
      userApi.endpoints.getFollowDetails.matchPending,
      (state) => {
        state.error = null;
        state.loading = true;
      }
    );
    builder.addMatcher(
      userApi.endpoints.getFollowDetails.matchRejected,
      (state, { error }) => {
        state.error = error;
        state.loading = true;
      }
    );
  },
});

export default followsCount.reducer;
export const {resetFollowers} = followsCount.actions