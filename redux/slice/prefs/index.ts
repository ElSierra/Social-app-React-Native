import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Prefs = {
  mode: "system" | "light" | "dark";
};
const prefs = createSlice({
  name: "prefs",
  initialState: {
    mode: "system",
  } as Prefs,
  reducers: {
    setMode: (
      state,
      action: PayloadAction<{ mode: "system" | "light" | "dark" }>
    ) => {
      state.mode = action.payload.mode;
    },
  },
});

export default prefs.reducer;
export const { setMode } = prefs.actions;
