import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { configToken, URL } from "../../config/utils";

const initialState = {
  chatLists: [],
  query: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  otherUserId: "",
  selected: null,
  groupUsers: [],
};

// Search user
export const searchUser = createAsyncThunk(
  "/chat/searchUser",
  async (value) => {
    try {
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

// Create group chat
export const createGroupChat = createAsyncThunk(
  "/chat/createGroupChat",
  async (value) => {
    try {
      const config = configToken();
      const { data } = await axios.post(
        `${URL}/api/chat/groupChat`,
        value,
        config
      );
      if (data.success == 1) {
        toast.success("Group Created successfully");
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// Rename group chat
export const renameGroupChat = createAsyncThunk(
  "/chat/renameGroupChat",
  async (value) => {
    try {
      const config = configToken();
      const { data } = await axios.post(
        `${URL}/api/chat/renameGroup`,
        value,
        config
      );
      if (data.success == 1) {
        toast.success("Renamed successfully");
        return data;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

// Remove user
export const removeUserFromGroup = createAsyncThunk(
  "/chat/removeUserFromGroup",
  async (value) => {
    try {
      const config = configToken();
      const { data } = await axios.post(
        `${URL}/api/chat/removeUser`,
        value,
        config
      );
      if (data.success == 1) {
        toast.success("User removed successfully");
        return data;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

// Add user
export const addUserInGroup = createAsyncThunk(
  "/chat/addUserInGroup",
  async (value) => {
    try {
      const config = configToken();
      const { data } = await axios.post(
        `${URL}/api/chat/addUser`,
        value,
        config
      );
      if (data.success == 1) {
        toast.success("User added successfully");
        return data;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

// Send Message

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
    resetSetSelected: (state, action) => {
      state.selected = null;
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

    // Create Group Chat start
    builder.addCase(createGroupChat.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createGroupChat.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(createGroupChat.rejected, (state, action) => {
      state.isError = true;
    });
    // Create Group Chat end

    // Rename Group Chat start
    builder.addCase(renameGroupChat.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(renameGroupChat.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.selected = action.payload.details;
    });
    builder.addCase(renameGroupChat.rejected, (state, action) => {
      state.isError = true;
    });
    // Rename  Group Chat end

    // Remove user Group Chat start
    builder.addCase(removeUserFromGroup.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeUserFromGroup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.selected = action.payload.details;
    });
    builder.addCase(removeUserFromGroup.rejected, (state, action) => {
      state.isError = true;
    });
    // Remove  Group Chat end

    // Add User in Group Chat start
    builder.addCase(addUserInGroup.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUserInGroup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.selected = action.payload.details;
    });
    builder.addCase(addUserInGroup.rejected, (state, action) => {
      state.isError = true;
    });
    // Add User in Group Chat end
  },
});

// Action creators are generated for each case reducer function
export const {
  searchQuery,
  setOtherUserId,
  setSelected,
  groupUsers,
  resetQuery,
  resetSetSelected,
} = chatSlice.actions;

export default chatSlice.reducer;
