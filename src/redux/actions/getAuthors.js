import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient.js";

const getAuthors = createAsyncThunk("getAuthors", async (token, { rejectWithValue }) => {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const authors = await apiClient.get("/authors/admin", config);
    return authors.data;
  } catch (error) {
    console.error("error getAuthors", error);
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export { getAuthors };