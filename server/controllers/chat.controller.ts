import { Request, Response } from "express";
import Chat from "../models/chat.model";

interface createChatRequest {
  firstId: string;
  secondId: string;
}

const createChat = async (req: Request<createChatRequest>, res: Response) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) return res.json(chat);

    const response = await Chat.create({
      members: [firstId, secondId],
    });
    return res.json(response);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error });
  }
};

const findUserChats = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const chats = await Chat.find({
      members: { $in: [userId] },
    });
    return res.json(chats);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error });
  }
};

const findChat = async (req: Request, res: Response) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });
    return res.json(chat);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error });
  }
};

export { createChat, findChat, findUserChats };
