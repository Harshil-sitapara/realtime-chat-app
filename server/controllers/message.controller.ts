import { Request, Response } from "express";
import Message from "../models/message.model";

const createMessage = async (req: Request, res: Response) => {
  const { chatId, senderId, text } = req.body;

  try {
    const message = await Message.create({
      chatId,
      senderId,
      text,
    });
    return res.json(message);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error });
  }
};

const getMessages = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chatId });
    return res.json(messages);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error });
  }
};


export { createMessage, getMessages };