import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { Comments, IPost } from "./IPost";
const tokens1 = localStorage.getItem("access_token");
export const getPosts = createAsyncThunk("post/getPosts", async () => {
  let url = `${process.env.REACT_APP_BASE_ENDPOINT}/post/timeline/posts`;
  const tokens1 = localStorage.getItem("access_token");
  const res = await axios(url, {
    headers: {
      Authorization: "Bearer: " + tokens1,
    },
  });

  return res.data.posts;
});
export const getPost = createAsyncThunk("post/getPost", async (id: any) => {
  let url = `${process.env.REACT_APP_BASE_ENDPOINT}/post/${id}`;

  const res = await axios(url);

  return res.data.post;
});
export const getCommets = createAsyncThunk(
  "post/getCommets",
  async (id: any) => {
    let url = `http://localhost:5000/api/comment/${id}/post`;

    const res = await axios(url);

    return res.data.comments;
  }
);
export const likePost = createAsyncThunk("post/likePost", async (id: any) => {
  let url = `${process.env.REACT_APP_BASE_ENDPOINT}/post/${id}/like`;

  const res = await axios(url, {
    headers: {
      Authorization: "Bearer: " + tokens1,
    },
  });

  return res.data;
});
export const unlikePost = createAsyncThunk(
  "post/unlikePost",
  async (id: any) => {
    let url = `${process.env.REACT_APP_BASE_ENDPOINT}/post/${id}/unlike`;

    const res = await axios(url, {
      headers: {
        Authorization: "Bearer: " + tokens1,
      },
    });

    return res.data;
  }
);
export const likeSinglePost = createAsyncThunk(
  "post/likeSinglePost",
  async (id: any) => {
    let url = `${process.env.REACT_APP_BASE_ENDPOINT}/post/${id}/like`;

    const res = await axios(url, {
      headers: {
        Authorization: "Bearer: " + tokens1,
      },
    });

    return res.data;
  }
);
export const unlikeSinglePost = createAsyncThunk(
  "post/unlikeSinglePost",
  async (id: any) => {
    let url = `${process.env.REACT_APP_BASE_ENDPOINT}/post/${id}/unlike`;

    const res = await axios(url, {
      headers: {
        Authorization: "Bearer: " + tokens1,
      },
    });

    return res.data;
  }
);
export const newPost = createAsyncThunk("post/newPost", async (input: any) => {
  const tokens1 = localStorage.getItem("access_token");
  const res = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/post`, input, {
    headers: {
      Authorization: "Bearer: " + tokens1,
    },
  });

  return res.data;
});
export const upload = createAsyncThunk("post/upload", async (data: any) => {
  const tokens1 = localStorage.getItem("access_token");
  const res = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/upload`, data, {
    headers: {
      Authorization: "Bearer: " + tokens1,
    },
  });

  return res.data;
});
export const newComment = createAsyncThunk(
  "post/newComment",
  async (input: any) => {
    const tokens1 = localStorage.getItem("access_token");
    const res = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/comment`, input, {
      headers: {
        Authorization: "Bearer: " + tokens1,
      },
    });

    return res.data.comments;
  }
);
interface PostState {
  post: IPost[];
  singlePost: any;
  comments: Comments[];
  loading: boolean;
}

const initialState: PostState = {
  post: [],
  singlePost: null,
  comments: [],
  loading: false,
};

export const postSlice = createSlice({
  name: "post",

  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading=false
    });
    builder.addCase(getPosts.pending, (state, action) => {
          state.loading=true
    });
    builder.addCase(newPost.fulfilled, (state, action) => {
      state.post.unshift(action.payload.findPost);
    });
    builder.addCase(newComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(upload.fulfilled, (state, action) => {});
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.singlePost = action.payload;
      state.loading = false;
    });
    builder.addCase(getPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCommets.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      console.log("aciton.payload", action.payload);

      const { id, userId } = action.payload;

      const index = state.post.findIndex((p: any) => p?._id === String(id));
      console.log("index", index);
      state.post[index].likes.push(userId);
    });
    builder.addCase(likeSinglePost.fulfilled, (state, action) => {
      const { userId } = action.payload;
      state.singlePost.likes.push(userId);
    });
    builder.addCase(unlikePost.fulfilled, (state, action) => {
      console.log("aciton.payload", action.payload);
      const { id, userId } = action.payload;

      const indexPost = state.post.findIndex((p: any) => p?._id === String(id));

      const indexLike = state.post[indexPost].likes.findIndex(
        (like: any) => like === String(userId)
      );
      state.post[indexPost].likes.splice(indexLike, 1);
    });
    builder.addCase(unlikeSinglePost.fulfilled, (state, action) => {
      const { userId } = action.payload;

      const index = state.singlePost.likes.findIndex(
        (like: any) => like === String(userId)
      );
      state.singlePost.likes.splice(index, 1);
    });
  },
});

export default postSlice.reducer;
