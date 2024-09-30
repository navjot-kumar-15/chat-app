import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { configToken, URL } from "../../config/utils";
import axios from "axios";

const initialState = {
  count: null,
  isLoading: false,
  isError: false,
  notifications: null,
};

export const getAllNotification = createAsyncThunk(
  "/notification/getAllNotification",
  async () => {
    const config = configToken();
    const { data } = await axios.get(`${URL}/api/notification`, config);
    console.log(data);
    if (data.success == 1) {
      console.log(data);
      return data;
    }
  }
);

export const readNotification = createAsyncThunk(
  "/notification/readNotification",
  async () => {
    const config = configToken();
    const { data } = await axios.post(`${URL}/api/notification/read`, config);
    if (data.success == 1) {
      return data;
    }
  }
);

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all Notification start
    builder.addCase(getAllNotification.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllNotification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.count = action.payload.count;
    });
    builder.addCase(getAllNotification.rejected, (state, action) => {
      state.isError = true;
    });
    // Get all Notification end

    builder.addCase(readNotification.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(readNotification.fulfilled, (state, action) => {
      state.isLoading = false;
      //   state.count = action.payload.count;
    });
    builder.addCase(readNotification.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = notificationSlice.actions;

export default notificationSlice.reducer;
