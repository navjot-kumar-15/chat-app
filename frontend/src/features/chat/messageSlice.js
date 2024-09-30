import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { configToken, socketConfig, URL } from "../../config/utils";

const initialState = {
  value: 0,
  messages: [],
  message: null,
  isLoading: false,
  isError: false,
  socketStatus: false,
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
        let socket = socketConfig();
        socket.emit("new-message", data.details);

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
      const { data } = await axios.get(`${URL}/api/message/${value}`, config);

      if (data.success == 1) {
        // console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages = action.payload;
      // console.log(action.payload);
    },
    setSocket: (state, action) => {
      socket = action.payload; // Store the socket connection
    },
  },
  extraReducers: (builder) => {
    // Send Message start
    builder.addCase(sendMessage.pending, (state, action) => {
      state.isLoading = true;
      state.socketStatus = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.isLoading = false;
      let socket = socketConfig();
      socket.on("message-recieved", (newMessage) => {
        state.messages = [...state.messages, newMessage];
      });
      state.socketStatus = false;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
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
      state.messages = action?.payload ? action.payload?.details : [];
    });
    builder.addCase(getAllMessages.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      // state.message = [];
    });
    // Get All Message end
  },
});

// Action creators are generated for each case reducer function
export const { addMessage } = MessageSlice.actions;

export default MessageSlice.reducer;
