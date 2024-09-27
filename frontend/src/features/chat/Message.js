import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const URL = import.meta.e;

function configToken() {
  const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      token,
    },
  };
  return config;
}

const initialState = {
  value: 0,
  messages: [],
  message: null,
  isLoading: false,
  isError: false,
};

// Send Message
export const sendMessage = createAsyncThunk(
  "/message/sendMessage",
  async (value) => {
    try {
      const config = configToken();
      const { data } = await axios.post(
        `${URL}/api/message/send`,
        value,
        config
      );
      if (data.success == 1) {
        return data;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

// Fetch all Messages
export const getAllMessages = createAsyncThunk(
  "/message/getAllMessages",
  async (value) => {
    try {
      const config = configToken();
      const { data } = await axios.post(
        `${URL}/api/message/send/${id}`,
        config
      );
      if (data.success == 1) {
        return data;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Send Message start
    builder.addCase(sendMessage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages.push(action.payload.details);
    });
    builder.addCase(sendMessage.pending, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    // Send Message end

    // Get All Message start
    builder.addCase(getAllMessages.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages = action.payload.details;
    });
    builder.addCase(getAllMessages.pending, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    // Get All Message end
  },
});

// Action creators are generated for each case reducer function
export const {} = MessageSlice.actions;

export default MessageSlice.reducer;
