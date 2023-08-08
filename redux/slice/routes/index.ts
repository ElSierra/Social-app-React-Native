import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Route = {
  route: "onBoard" | "Auth" | "App";
};

const routeSlice = createSlice({
  name: "route",
  initialState: {
    route: "onBoard",
  } as Route,
  reducers: {
    setRoute: (state, action: PayloadAction<Route>) => {
      state.route = action.payload.route;
    },
  },
});

export default routeSlice.reducer;
export const { setRoute } = routeSlice.actions;
