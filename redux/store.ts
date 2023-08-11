import {
  CombinedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import routes, { Route } from "./slice/routes";
import prefs, { Prefs } from "./slice/prefs";
import bottomSheet, { BottomSheet } from "./slice/bottomSheet";
import { reduxStorage } from "./storage";
import post from "./slice/post";
import toast, { ToastState } from "./slice/toast/toast";
import { authApi } from "./api/auth";

import user, { UserState } from "./slice/user";
import {
  persistReducer,
  REHYDRATE,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from "redux-persist";
import { postLists } from "../data/test";

const persistConfig: PersistConfig<
  CombinedState<{
    routes: Route;
    prefs: Prefs;
    bottomSheet: BottomSheet;
    post: typeof postLists;
    toast: ToastState;
    user: UserState;

    [authApi.reducerPath]: any;
  }>
> = {
  key: "root",
  storage: reduxStorage,
  blacklist: ["bottomSheet", "post", "toast",],
};

const reducer = combineReducers({
  routes,
  prefs,
  bottomSheet,
  post,
  toast,

  [authApi.reducerPath]: authApi.reducer,
  user,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
