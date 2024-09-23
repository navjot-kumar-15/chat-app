import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const URL = import.meta.env.VITE_REACT_URL;

import axios from "axios";

const initialState = {
  query: "",
  isLoading: false,
  isError: false,
  otherUserId: "",
  chatLists: [],
};

const token = JSON.parse(localStorage.getItem("token"));
const config = {
  headers: {
    token,
  },
};

// Search user
export const searchUser = createAsyncThunk("chat/searchUser", async (value) => {
  try {
    const { data } = await axios.get(
      `${URL}/api/user/search?q=${value}`,
      config
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

// Access chat
export const singleChat = createAsyncThunk("chat/singleChat", async (id) => {
  try {
    const { data } = await axios.get(`${URL}/api/chat?userId=${id}`, config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

// Get users chat
export const getUserChats = createAsyncThunk("chat/getUserChats", async () => {
  try {
    const { data } = await axios.get(`${URL}/api/chat/userChat`, config);
    return data.details;
  } catch (error) {
    console.log(error.message);
  }
});

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    searchQuery: (state, action) => {
      state.query = action.payload;
    },
    setOtherUserId: (state, action) => {
      state.otherUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Search user start
    builder.addCase(searchUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(searchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.query = action.payload;
    });
    builder.addCase(searchUser.rejected, (state, action) => {
      state.isError = true;
    });
    // Search user end

    // Access user chat start
    builder.addCase(singleChat.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(singleChat.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.query = action.payload;
    });
    builder.addCase(singleChat.rejected, (state, action) => {
      state.isError = true;
    });
    // Access user chat end

    // Get user chat start
    builder.addCase(getUserChats.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserChats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chatLists = action.payload;
    });
    builder.addCase(getUserChats.rejected, (state, action) => {
      state.isError = true;
    });
    // Get user chat end
  },
});

// Action creators are generated for each case reducer function
export const { searchQuery, setOtherUserId } = chatSlice.actions;

export default chatSlice.reducer;
