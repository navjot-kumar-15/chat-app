import { io } from "socket.io-client";
export const URL = import.meta.env.VITE_REACT_URL;

// Default image URL
export const defaultImage =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

// Time format
export function timeFormat(time) {
  let val = new Date(time).toLocaleString("hi-IN").split(",");
  let t = val[1].split(" ");
  let sp = t[1].split(":");
  let formatT = sp[0] + ":" + sp[1] + " " + t[2] + " " + val[0];
  return formatT;
}

// Socket instance
export const socketConfig = () => {
  let socket = io(URL);
  return socket;
};

export function configToken() {
  const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      token,
    },
  };
  return config;
}
