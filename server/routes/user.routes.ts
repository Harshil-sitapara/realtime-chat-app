import { Router } from "express";
import {
  findUser,
  findUserByEmail,
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/find/:userId", findUser);
router.post("/findByEmail", findUserByEmail);

export default router;
