import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const tokens1 = localStorage.getItem("access_token");
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (id: any) => {
    const res = await axios(
      `${process.env.REACT_APP_BASE_ENDPOINT}/auth/${id}/profile`
    );

    return res.data.user;
  }
);
export const login = createAsyncThunk("login/login", async (user: any) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`,
    user
  );

  return res.data;
});
export const register = createAsyncThunk("login/register", async (user: any) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`,
    user
  );

  return res.data;
});
export const logout = createAsyncThunk("logout/logout", async () => {
  const tokens1 = localStorage.getItem("access_token");

  const res = await axios(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`,
    {
      headers: {
        Authorization: "Bearer: " + tokens1,
      },
    }
  );

  return res.data;
});
export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (search: any) => {
    let url = `${process.env.REACT_APP_BASE_ENDPOINT}/auth/getall`;
    if (search) {
      url += "?search=" + search;
    }
    const res = await axios(url);

    return res.data.users;
  }
);
export const getAllUser = createAsyncThunk("auth/getAllUser", async () => {
  let url = `${process.env.REACT_APP_BASE_ENDPOINT}/auth/getall`;

  const res = await axios(url);

  return res.data.users;
});
export const followUser = createAsyncThunk(
  "auth/followUser",
  async (id: any) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_ENDPOINT}/auth/follow`,
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
export const unFollowUser = createAsyncThunk(
  "auth/unFollowUser",
  async (id: any) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_ENDPOINT}/auth/unfollow`,
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
  currentUser: any;
  allUser: any;
  loading:boolean
}

const initialState: UserState = {
  profile: null,
  user: null,
  currentUser: null,
  users: [],
  allUser: [],
  loading:false
};

export const authSlice = createSlice({
  name: "post",

  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading=false
    });
    builder.addCase(getProfile.pending, (state, action) => {
         state.loading=true
    });
    builder.addCase(register.fulfilled, (state, action) => {
  console.log('aciton.payload', action.payload)
 });
 
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.allUser = action.payload;
      const userId = localStorage.getItem("id");
      state.currentUser = state.allUser.find((a: any) => a._id === userId);
      state.loading=false
    });
    builder.addCase(getAllUser.pending, (state, action) => {
       state.loading=true
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.currentUser.followings.push(action.payload);
    });
    builder.addCase(unFollowUser.fulfilled, (state, action) => {
      const index = state.currentUser?.followings?.indexOf(
        String(action.payload)
      );
      console.log("action.paylod", index);
      state.currentUser.followings.splice(index, 1);
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
