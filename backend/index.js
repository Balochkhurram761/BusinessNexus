import express from "express";
import DbConnection from "./database/DbConnection.js";
import dotenv from "dotenv";
import router from "./router/AuthRouter.js";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import { setSocketIo } from "./controller/messageController.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
DbConnection();
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", router);
const Port = process.env.port || 5000;

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("join_room", (roomId) => {
//     socket.join(roomId);
//     console.log(`User ${socket.id} joined room ${roomId}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });
setSocketIo(io);
server.listen(Port, () => {
  console.log(`The server port is ${Port}`);
});
