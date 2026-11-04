import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient.js";

const editChapterAction = createAsyncThunk(
  "editChapter",
  async ({ id, info, manga_id }, { rejectWithValue }) => {
    try {
      const url = manga_id ? `/chapters/${id}?manga_id=${manga_id}` : `/chapters/${id}`;
      const response = await apiClient.put(url, info);
      return response.data;
    } catch (error) {
      console.error("Error editing chapter:", error);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export default editChapterAction;
