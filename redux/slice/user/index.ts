import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth";
import { IUSerData } from "../../../types/api";
import { userApi } from "../../api/user";
import socket from "../../../util/socket";

export interface UserState {
  data: IUSerData | null;
  error: any;
  token: string | null;
  loading: boolean;
}
const user = createSlice({
  name: "user",
  initialState: {
    data: null,
    error: null,
    loading: false,
    token: null,
  } as UserState,
  reducers: {
    signOut: (state) => {
      state.error = null;
      state.loading = false;
      state.token = null;
      socket.disconnect();
    },
    clearUserData: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.data = payload.data;
        state.error = null;
        state.loading = false;
      }
    );
    builder.addMatcher(userApi.endpoints.getUser.matchPending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addMatcher(
      userApi.endpoints.getUser.matchRejected,
      (state, { error }) => {
        state.data = null;
        state.error = error;
        state.loading = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.data = payload.data;
        state.error = null;
        state.loading = false;
        state.token = payload.token;
      }
    );
    builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
      state.data = null;
      state.error = null;
      state.loading = true;
      state.token = null;
    });
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, { error }) => {
        state.data = null;
        state.error = error;
        state.loading = true;
        state.token = null;
      }
    );
  },
});

export default user.reducer;

export const { signOut, clearUserData } = user.actions;
