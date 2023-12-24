import { Request, Response } from "express";
import User from "../models/user.model";
import validator from "validator";
import {
  MatchPasswordAndGenerateToken,
  createTokenForUser,
} from "../services/user.services";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required!" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "invalid Email!" });
    }

    const createdUser = new User({
      name,
      email,
      password,
    });
    const token = createTokenForUser(createdUser);
    await createdUser.save();
    return res.json({ _id: createdUser._id, name: createdUser.name, token });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields require!" });
    const { user, token } = await MatchPasswordAndGenerateToken(
      email,
      password
    );

    res.json({ _id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: (error as Error).message || "Internal server error" });
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

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: error });
  }
};
export { registerUser, loginUser, findUser, getAllUsers };
