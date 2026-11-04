import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient.js";

const editComment = createAsyncThunk('editComment', async (info, { rejectWithValue }) => {
  try {
    const config = info.token ? { headers: { Authorization: "Bearer " + info.token } } : {};
    const res = await apiClient.put(`/comments/${info.comment_id}`, { text: info.text }, config);
    return { comments: res.data.response };
  } catch (error) {
    console.error("edit comment error:", error);
    return rejectWithValue({ error: error.message });
  }
});

export default editComment;
