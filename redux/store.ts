import { configureStore } from "@reduxjs/toolkit";
import routes from "./slice/routes";
import prefs from "./slice/prefs";

export const store = configureStore({
  reducer: { routes, prefs },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
