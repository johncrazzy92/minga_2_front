import { createReducer } from "@reduxjs/toolkit";
import action from "../actions/mangas";

const { mymangas, deleteManga, updateManga } = action;

const initialState = {
  mangas: [],
  manga: {},
  loading: false,
  error: null,
};

const myMangasReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(mymangas.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(mymangas.fulfilled, (state, action) => {
      state.mangas = action.payload?.mangas || action.payload?.response || [];
      state.loading = false;
    })
    .addCase(mymangas.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || "Failed to load mangas";
    })
    .addCase(deleteManga.fulfilled, (state, action) => {
      const deletedId = action.payload?.response || action.meta?.arg;
      state.mangas = state.mangas.filter((manga) => manga._id !== deletedId);
    })
    .addCase(updateManga.fulfilled, (state, action) => {
      const updated = action.payload?.response;
      if (updated && updated._id) {
        state.mangas = state.mangas.map((manga) =>
          manga._id === updated._id ? updated : manga
        );
      }
    })
);

export default myMangasReducer;