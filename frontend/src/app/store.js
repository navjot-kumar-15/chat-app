import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import chatReducer from "../features/chat/chatSlice";
import messageReducer from "../features/chat/Message";

export const store = configureStore({
  reducer: { auth: authReducer, chat: chatReducer, message: messageReducer },
});
