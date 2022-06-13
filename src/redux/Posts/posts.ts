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
export const getPost = createAsyncThunk("post/getPost", async (id:any) => {
  let url = `http://localhost:5000/api/post/${id}`;

  const res = await axios(url);

  return res.data.post;
});
interface PostState {
  post: any[];
  singlePost:any

}

const initialState: PostState = {
  post: [],
  singlePost:null

};

export const postSlice = createSlice({
  name: "post",

  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.post = action.payload;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.singlePost = action.payload;
    });
  },
});

export default postSlice.reducer;
