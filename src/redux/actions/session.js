import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient.js";

const session = createAsyncThunk("sesionCheck", async (token, { rejectWithValue }) => {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await apiClient.post("/auth/signinToken", {}, config);
    return { user: response.data.response.user, token: token || localStorage.getItem("token") };
  } catch (error) {
    console.error("Session verification failed:", error);
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export default session;
