import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient.js";

const deleteChapterAction = createAsyncThunk(
  "deleteChapter",
  async ({ id, manga_id }, { rejectWithValue }) => {
    try {
      const url = manga_id ? `/chapters/${id}?manga_id=${manga_id}` : `/chapters/${id}`;
      const response = await apiClient.delete(url);
      return response.data;
    } catch (error) {
      console.error("Error deleting chapter:", error);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export default deleteChapterAction;
