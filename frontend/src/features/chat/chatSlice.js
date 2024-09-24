import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_REACT_URL;

const initialState = {
  chatLists: [],
  query: "",
  isLoading: false,
  isError: false,
  otherUserId: "",
  selected: null,
  groupUsers: [],
};

function configToken() {
  const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      token,
    },
  };
  return config;
}

// Search user
export const searchUser = createAsyncThunk(
  "/chat/searchUser",
  async (value) => {
    try {
      // const config = {
      //   headers: {
      //     token,
      //   },
      // };
      const config = configToken();
      const { data } = await axios.get(
        `${URL}/api/user/search?q=${value}`,
        config
      );
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// Access chat
export const singleChat = createAsyncThunk("/chat/singleChat", async (id) => {
  try {
    const config = configToken();
    const { data } = await axios.get(`${URL}/api/chat?userId=${id}`, config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

// Get users chat
export const getUserChats = createAsyncThunk("/chat/getUserChats", async () => {
  try {
    const config = configToken();
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
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    groupUsers: (state, action) => {
      state.groupUsers = action.payload;
    },
    resetQuery: (state, action) => {
      state.query = "";
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
export const {
  searchQuery,
  setOtherUserId,
  setSelected,
  groupUsers,
  resetQuery,
} = chatSlice.actions;

export default chatSlice.reducer;
