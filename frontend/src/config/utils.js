import { io } from "socket.io-client";
const URL = import.meta.env.VITE_REACT_URL;

export function timeFormat(time) {
  let val = new Date(time).toLocaleString("hi-IN").split(",");
  let t = val[1].split(" ");
  let sp = t[1].split(":");
  let formatT = sp[0] + ":" + sp[1] + " " + t[2] + " " + val[0];
  return formatT;
}

export const socketConfig = () => {
  let socket = io(URL, {
    transports: ["websocket", "polling"],
  });
  return socket;
};
