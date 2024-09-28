import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";
config();
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/messages.js";
import { errorHandler, notFound } from "./middleware/errorMIddleware.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("./uploads"));

// Database
connectDB();

app.get("/", (req, res) => {
  res.send("Hello world");
});
// api routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 8084;
const server = app.listen(PORT, () => console.log(`Server is on PORT ${PORT}`));

// Socket.IO setup
import { Server } from "socket.io";
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    console.log(userData);
  });

  socket.on("join-chat", (room) => {
    socket.join(room);
    console.log("User Joined the room ", room);
  });

  socket.on("new-message", (message) => {
    console.log("Message", message);
    let chat = message.chat;
    if (!chat.users) return console.log("No user found");
    chat.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("message-recieved", message);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
