import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient.js";

const createComment = createAsyncThunk('createComentario', async (info, { rejectWithValue }) => {
  try {
    const { token, ...commentData } = info;
    const config = token ? { headers: { Authorization: "Bearer " + token } } : {};
    const res = await apiClient.post('/comments', commentData, config);
    return { comments: res.data.response };
  } catch (error) {
    return rejectWithValue({ error: error.message });
  }
});

export default createComment;
