import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    members: Array,
  },
  { timestamps: true }
);

const Chat = mongoose.model("chats", chatSchema);
export default Chat;
