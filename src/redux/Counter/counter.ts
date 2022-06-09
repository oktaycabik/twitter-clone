import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getPosts = createAsyncThunk("post/getPosts", async () => {
  let url = `http://localhost:5000/api/post/timeline/629b454bd8cb79cad5dda883`;

  const res = await axios(url);

  return res.data.posts;
});

export const getProfile = createAsyncThunk("profile/getProfile", async (id:any) => {
  const res = await axios(
    `http://localhost:5000/api/auth/${id}/profile`
  );

  return res.data.user;
});

interface CounterState {
  post: any[];
  profile:any
}

const initialState: CounterState = {
  post: [],
  profile:null
};

export const counterSlice = createSlice({
  name: "counter",

  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.post = action.payload;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export default counterSlice.reducer;
