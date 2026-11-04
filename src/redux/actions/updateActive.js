import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient.js";

const updateActive = createAsyncThunk("updateActive", async (id, { rejectWithValue }) => {
  try {
    const author = await apiClient.put(`/authors/role/author/${id}`, null);
    return author.data;
  } catch (error) {
    console.error("error updateActive", error);
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export { updateActive };