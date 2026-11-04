import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient.js";

const mymangas = createAsyncThunk("MYMANGAS", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('/mangas/me');
    return response.data;
  } catch (error) {
    console.error("Error fetching my mangas:", error);
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

const deleteManga = createAsyncThunk("DELETEMANGA", async (id, { rejectWithValue }) => {
  try {
    const response = await apiClient.delete(`/mangas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting manga:", error);
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

const updateManga = createAsyncThunk("UPDATEMANGA", async (manga, { rejectWithValue }) => {
  try {
    const { id, ...dataToUpdate } = manga;
    const response = await apiClient.put(`/mangas/${id}`, dataToUpdate);
    return response.data;
  } catch (error) {
    console.error("Error updating manga:", error);
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

const action = { mymangas, deleteManga, updateManga };
export default action;
export { mymangas, deleteManga, updateManga };
