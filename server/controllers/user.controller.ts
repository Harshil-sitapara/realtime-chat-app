import { Request, Response } from "express";
import User from "../models/user.model";
import validator from "validator";
import {
  MatchPasswordAndGenerateToken,
  createTokenForUser,
} from "../services/user.services";
import cloudinary from '../services/cloudinary.js'

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, profilePhoto } = req.body;
    if (!name || !email || !password) {
      return res.json({ error: "All fields required!" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.json({ error: "User already exists!" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ error: "invalid Email!" });
    }
    let imageRes = {};
    if(profilePhoto){
      imageRes = await cloudinary.uploader.upload(profilePhoto, {
        upload_preset: "ChatApp",
      });
    }
    const createdUser = new User({
      name,
      email,
      password,
      profilePhoto: imageRes,
    });
    const token = createTokenForUser(createdUser);
    await createdUser.save();
    return res.json({
      _id: createdUser._id,
      name: createdUser.name,
      token,
      profilePhoto: createdUser?.profilePhoto,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ error: "All fields require!" });
    const { user, token } = await MatchPasswordAndGenerateToken(
      email,
      password
    );

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      profilePhoto: user?.profilePhoto,
    });
  } catch (error) {
    return res.json({
      error: (error as Error).message || "Internal server error",
    });
  }
};

const findUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById({ _id: userId });
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: error });
  }
};

const findUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.body.userEmail;
    const user = await User.findOne({ email });
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: error });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: error });
  }
};
export { registerUser, loginUser, findUser, getAllUsers, findUserByEmail };
