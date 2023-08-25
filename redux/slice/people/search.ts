import { IPerson, IPost } from "./../../../types/api";
import { createSlice } from "@reduxjs/toolkit";
import { postLists } from "../../../data/test";
import { servicesApi } from "../../api/services";

export type personState = {
  data: IPerson[];
  error: any;
  loading: boolean;
};

const searchPeople = createSlice({
  name: "searchPeople",
  initialState: {
    data: [],
    error: null,
    loading: false,
  } as personState,
  reducers: {
    addPost: () => {},
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      servicesApi.endpoints.getRandomPeople.matchFulfilled,
      (state, { payload }) => {
 
        state.data = payload.people;
        state.error = null;
        state.loading = false;
      }
    );
    builder.addMatcher(
      servicesApi.endpoints.getRandomPeople.matchPending,
      (state, { payload }) => {
        state.data = [];
        state.error = null;
        state.loading = true;
      }
    );
    builder.addMatcher(
      servicesApi.endpoints.getRandomPeople.matchRejected,
      (state, { payload, error }) => {
        state.data = [];
        state.error = error;
        state.loading = false;
      }
    );

    builder.addMatcher(
        servicesApi.endpoints.searchPeople.matchFulfilled,
        (state, { payload }) => {
  
          state.data = payload.people;
          state.error = null;
          state.loading = false;
        }
      );
      builder.addMatcher(
        servicesApi.endpoints.searchPeople.matchPending,
        (state, { payload }) => {
          state.data = [];
          state.error = null;
          state.loading = true;
        }
      );
      builder.addMatcher(
        servicesApi.endpoints.searchPeople.matchRejected,
        (state, { payload, error }) => {
          state.data = [];
          state.error = error;
          state.loading = false;
        }
      );

  },
});

export default searchPeople.reducer;
