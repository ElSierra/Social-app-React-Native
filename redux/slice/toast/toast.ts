import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import * as Haptics from "expo-haptics";
import { Platform } from "react-native";
const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS,
];
const PATTERN_DESC =
  Platform.OS === "android"
    ? "wait 1s, vibrate 2s, wait 3s"
    : "wait 1s, vibrate, wait 2s, vibrate, wait 3s";
export type ToastState = {
  text: string | null;
  imageUri?: string;
  open: boolean;
  type: "Failed" | "Success" | "Info" | "Message" | null;
};

const toastSlice = createSlice({
  name: "Toast",
  initialState: {
    text: null,
    open: false,
    type: null,
  } as ToastState,
  reducers: {
    openToast: (
      state,
      action: PayloadAction<{
        text: string;
        imageUri?: string;
        type: "Failed" | "Success" | "Info" | "Message";
      }>
    ) => {
      state.open = true;
      state.imageUri = action.payload.imageUri;
      state.text = action.payload.text;
      state.type = action.payload.type;
    },
    closeToast: (state) => {
      state.open = false;
      state.text = null;
      state.type = null;
    },
  },
});

export default toastSlice.reducer;
export const { openToast, closeToast } = toastSlice.actions;
