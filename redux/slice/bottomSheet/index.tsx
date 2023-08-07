import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type BottomSheet = {
  isOpen: boolean;
  type: string | null;
};
export const bottomSheet = createSlice({
  name: "bottomSheet",
  initialState: {
    isOpen: false,
    type: null,
  } as BottomSheet,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ isOpen: boolean; type: string }>
    ) => {
      state.isOpen = action.payload.isOpen;
      state.type = action.payload.type;
    },
  },
});
