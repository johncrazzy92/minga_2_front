import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient.js";

const deleteAction = createAsyncThunk('deleteAction', async (info, { rejectWithValue }) => {
  try {
    const config = info.token ? { headers: { Authorization: "Bearer " + info.token } } : {};
    const res = await apiClient.delete(`/comments/${info.comment_id}`, config);
    return { comments: res.data.response };
  } catch (error) {
    console.error("delete comment error:", error);
    return rejectWithValue({ error: error.message });
  }
});

export default deleteAction;
