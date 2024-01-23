import { Router } from "express";
import {
  clearMessages,
  createMessage,
  getMessages,
} from "../controllers/message.controller";

const router = Router();

router.post("/", createMessage);
router.get("/:chatId", getMessages);
router.post("/clearMessages/:chatId", clearMessages);

export default router;
