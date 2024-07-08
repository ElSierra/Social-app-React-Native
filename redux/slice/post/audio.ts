import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const audio = createSlice({
  name: "audioPlaying",
  initialState: {
    playingId: []
  } as {
    playingId: number[] 
  },
  reducers: {
    setPlayingIds: (state, action: PayloadAction<number[]>) => {
      state.playingId = action.payload;
    },
  },
});


export default audio.reducer;
export const { setPlayingIds } = audio.actions;
