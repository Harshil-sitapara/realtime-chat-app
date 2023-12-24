import { Request, Response } from "express";
import User from "../models/user.model";
import validator from "validator";
import { createTokenForUser } from "../services/user.services";

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

export { registerUser };
