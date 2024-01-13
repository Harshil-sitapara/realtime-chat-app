import { Server } from "socket.io";
import http from "http";

const io = new Server(3000,{
  cors: "http://localhost:5000", // node js back-end URL
  extraHeaders: {
    "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  //NOTE - Add new user when online
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId == userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    io.emit("getOnlineUsers", onlineUsers);
  });

  //NOTE - Add message
  socket.on("sendMessage", (message) => {
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
