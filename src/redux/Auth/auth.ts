import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const tokens1 = localStorage.getItem("access_token");
export const getProfile = createAsyncThunk("profile/getProfile", async (id:any) => {
 
  const res = await axios(`http://localhost:5000/api/auth/${id}/profile`);

  return res.data.user;
});
export const login = createAsyncThunk("login/login", async (user: any) => {
  const res = await axios.post(`http://localhost:5000/api/auth/login`, user);

  return res.data;
});
export const logout = createAsyncThunk("logout/logout", async () => {
  const tokens1 = localStorage.getItem("access_token");

  const res = await axios(`http://localhost:5000/api/auth/logout`, {
    headers: {
      Authorization: "Bearer: " + tokens1,
    },
  });

  return res.data;
});
export const getAllUsers = createAsyncThunk("auth/getAllUsers", async () => {
  const res = await axios(`http://localhost:5000/api/auth/getall`);

  return res.data.users;
});
export const followUser = createAsyncThunk(
  "auth/followUser",
  async (id: any) => {
    const res = await axios.post(`http://localhost:5000/api/auth/follow`, id, {
      headers: {
        Authorization: "Bearer: " + tokens1,
      },
    });

    return res.data.user;
  }
);
export const unFollowUser = createAsyncThunk(
  "auth/unFollowUser",
  async (id: any) => {
    const res = await axios.post(
      `http://localhost:5000/api/auth/unfollow`,
      id,
      {
        headers: {
          Authorization: "Bearer: " + tokens1,
        },
      }
    );

    return res.data.user;
  }
);
interface UserState {
  profile: any;
  user: any;
  users: any;
}

const initialState: UserState = {
  profile: null,
  user: null,
  users: [],
};

export const authSlice = createSlice({
  name: "post",

  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      console.log("action.paylod", action.payload);
      state.profile.followings.push(action.payload);
    });
    builder.addCase(unFollowUser.fulfilled, (state, action) => {
      const index = state.profile?.followings?.indexOf(String(action.payload));
      console.log("action.paylod", index);
      state.profile.followings.splice(index, 1);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("access_token", action.payload.access_token);
      localStorage.setItem("id", action.payload.data.id);
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;

      localStorage.removeItem("access_token");
      localStorage.removeItem("id");
    });
  },
});

export default authSlice.reducer;
