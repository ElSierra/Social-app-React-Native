import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type LoadingModal = {
  isOpen: boolean;
};
const loadingModal = createSlice({
  name: "bottomSheet",
  initialState: {
    isOpen: false,
  } as LoadingModal,
  reducers: {
    openLoadingModal: (state) => {
      state.isOpen = true;
    },
    closeLoadingModal: (state) => {
      state.isOpen = false;
    },
  },
});

export default loadingModal.reducer;
export const { openLoadingModal, closeLoadingModal } = loadingModal.actions;
