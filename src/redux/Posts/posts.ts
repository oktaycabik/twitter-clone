import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getPosts = createAsyncThunk("post/getPosts", async () => {
  let url = `http://localhost:5000/api/post/timeline/posts`;
  const tokens1 = localStorage.getItem("access_token");
  const res = await axios(url,{
    headers: {
      Authorization: "Bearer: " + tokens1,
    },
  });

  return res.data.posts;
});

interface PostState {
  post: any[];

}

const initialState: PostState = {
  post: [],

};

export const postSlice = createSlice({
  name: "post",

  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.post = action.payload;
    });
  },
});

export default postSlice.reducer;
