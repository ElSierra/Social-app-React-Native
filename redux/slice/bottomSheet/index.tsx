import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type BottomSheet = {
  isOpen: boolean;
  type: string | null;
};
const bottomSheet = createSlice({
  name: "bottomSheet",
  initialState: {
    isOpen: false,
    type: null,
  } as BottomSheet,
  reducers: {
    openSheet: (state, action: PayloadAction<{ type: string }>) => {
      state.isOpen = true;
      state.type = action.payload.type;
    },
    closeSheet: (state) => {
      state.isOpen = false;
      state.type = null;
    },
  },
});

export default bottomSheet.reducer;
export const { openSheet, closeSheet } = bottomSheet.actions;
