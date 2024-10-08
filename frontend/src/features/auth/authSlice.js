import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const URL = import.meta.env.VITE_REACT_URL;

import axios from "axios";

const initialState = {
  userInfo: null,
  isLoading: false,
  isError: false,
  token: null,
  message: "",
};
// const URL = "http://localhost:8080";
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (value) => {
    try {
      const { data } = await axios.post(`${URL}/api/user/register`, value);
      // console.log(data)

      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const loginUser = createAsyncThunk("auth/loginUser", async (value) => {
  try {
    const { data } = await axios.post(`${URL}/api/user/login`, value);
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

export const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const config = {
      headers: {
        token,
      },
    };
    const { data } = await axios.get(`${URL}/api/user`, config);
    return data;
  } catch (error) {
    return error.message;
  }
});
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      toast.success("Logged out successfully");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    },
  },
  extraReducers: (builder) => {
    // Register user start
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isError = true;
    });
    // Register user end

    // Login user start
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isError = true;
    });
    // Login user end

    // User Info start
    builder.addCase(getUserInfo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.isError = true;
    });
    // User info end
  },
});

// Action creators are generated for each case reducer function
export const { handleLogout } = authSlice.actions;

export default authSlice.reducer;
