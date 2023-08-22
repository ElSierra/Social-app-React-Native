import {
  CombinedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import routes, { Route } from "./slice/routes";
import prefs, { Prefs } from "./slice/prefs";
import bottomSheet, { BottomSheet } from "./slice/bottomSheet";
import { reduxStorage } from "./storage";
import post, { postState } from "./slice/post";
import searchPost from "./slice/post/search";
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
import { userApi } from "./api/user";
import { servicesApi } from "./api/services";
import loadingModal, { LoadingModal } from "./slice/modal/loading";
import searchPeople, { personState } from "./slice/people/search";

const persistConfig: PersistConfig<
  CombinedState<{
    routes: Route;
    prefs: Prefs;
    bottomSheet: BottomSheet;
    post: postState;
    searchPost: postState;
    toast: ToastState;
    user: UserState;
    searchPeople: personState;
    loadingModal: LoadingModal;
    [authApi.reducerPath]: any;
    [userApi.reducerPath]: any;
    [servicesApi.reducerPath]: any;
  }>
> = {
  key: "root",
  storage: reduxStorage,
  whitelist: ["routes", "prefs", "user"],
};

const reducer = combineReducers({
  routes,
  prefs,
  bottomSheet,
  post,
  toast,
  loadingModal,
  searchPost,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [servicesApi.reducerPath]: servicesApi.reducer,
  user,
  searchPeople,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(servicesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
