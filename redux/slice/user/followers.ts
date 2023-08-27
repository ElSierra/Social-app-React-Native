import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { userApi } from "../../api/user";

export interface FollowerState {
  following: number | null;
  followers: number | null;
}
const followsCount = createSlice({
  name: "followsCount",
  initialState: {
    followers: 0,
    following: 0,
  } as FollowerState,
  reducers: {
    resetFollowers: (state) => {
      state.following = 0;
      state.followers = 0;
    },
    updateFollowing: (state, action: PayloadAction<{ following: number }>) => {
      state.following = action.payload.following;
    },
    updateFollowers: (state, action: PayloadAction<{ followers: number }>) => {
      state.followers = action.payload.followers;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getFollowDetails.matchFulfilled,
      (state, { payload }) => {
        state.followers = Number(payload.followers);
        state.following = Number(payload.following);
      }
    );
  },
});

export default followsCount.reducer;
export const { resetFollowers, updateFollowers, updateFollowing } =
  followsCount.actions;
