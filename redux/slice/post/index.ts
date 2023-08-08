import { createSlice } from "@reduxjs/toolkit";
import { postLists } from "../../../data/test";

const post = createSlice({
  name: "post",
  initialState: postLists,
  reducers: {
    addPost: () => {},
  },
});

export default post.reducer;
