import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const currentPage = createSlice({
  name: "currentPage",
  initialState: {
    page: null,
  } as {
    page: string | null;
  },
  reducers: {
    setCurrentPage: (state, action: PayloadAction<{ page: string }>) => {
      state.page = action.payload.page;
    },
  },
});

export default currentPage.reducer;
export const { setCurrentPage } = currentPage.actions;
