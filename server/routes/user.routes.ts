import express, { Express, Request, Response, Router } from "express";
import {
  findUser,
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/find/:userId", findUser);

export default router;
