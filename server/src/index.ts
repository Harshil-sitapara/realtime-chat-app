import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server,Socket } from "socket.io";
import ConnectToDb from "./db";
import UserRoute from "../routes/user.routes";
import ChatRoute from "../routes/chat.routes";
import MessageRoute from "../routes/message.routes";
import cors from "cors";
import bodyParser from "body-parser";
import User from "../models/user.model";

const app: Express = express();
const httpServer = createServer(app);


app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb",
    parameterLimit: 50000,
  })
);
dotenv.config();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true
  }
});
let onlineUsers: OnlineUser[] = [];
io.on("connection", (socket:Socket) => {
  console.log("New connection", socket.id);
  // NOTE - Add new user when online
  socket.on("addNewUser", (userId:string) => {
    !onlineUsers.some((user) => user.userId == userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    io.emit("getOnlineUsers", onlineUsers);
  });

  //NOTE - Add message
  socket.on("sendMessage", (message:any) => {
    const user = onlineUsers?.find(
      (user) => user.userId == message.recipientId
    );
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message?.data.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  //NOTE - Disconnect
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
  console.log(`onlineUsers at ${new Date().toLocaleTimeString()}`, onlineUsers);
});


const port = process.env.PORT || 5000;
const DBUrl = process.env.MONGO_URL;

// Mongo db connection
ConnectToDb(DBUrl);
app.get("/",(req:Request,res:Response)=>{
  res.json("Hello")
})
app.use("/api/users", UserRoute);
app.use("/api/chats", ChatRoute);
app.use("/api/message", MessageRoute);

interface OnlineUser {
  userId: string;
  socketId: string;
}

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
