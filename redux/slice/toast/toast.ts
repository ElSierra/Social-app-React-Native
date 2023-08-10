import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ToastState = {
  text: string | null;
  open: boolean;
  type: "Failed" | "Success" | "Info" | null;
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
        type: "Failed" | "Success" | "Info";
      }>
    ) => {
      state.open = true;
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
export const {openToast,closeToast} = toastSlice.actions;