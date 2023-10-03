import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Prefs = {
  mode: "system" | "light" | "dark";
  isHighEnd: boolean;
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
    setHighEnd: (state, action: PayloadAction<{ isHighEnd: boolean }>) => {
      state.isHighEnd = action.payload.isHighEnd;
    },
  },
});

export default prefs.reducer;
export const { setMode, setHighEnd } = prefs.actions;
