import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient.js";

const commentAction = createAsyncThunk('comentario', async (info, { rejectWithValue }) => {
  try {
    const { chapter_id, page, token } = info;
    const config = {
      params: { chapter_id, page },
    };
    if (token) {
      config.headers = { Authorization: "Bearer " + token };
    }
    const res = await apiClient.get('/comments', config);
    return { comments: res.data.response.comments, totalPages: res.data.response.totalPages };
  } catch (error) {
    return rejectWithValue({ error: error.message });
  }
});

export default commentAction;
