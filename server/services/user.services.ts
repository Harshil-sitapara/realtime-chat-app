import JWT from "jsonwebtoken";
import User from "../models/user.model";
import { createHmac } from "crypto";

const createTokenForUser = (user: any) => {
  try {
    const payload = {
      id: user._id,
      email: user.email,
    };
    const token = JWT.sign(payload, `${process.env.JWT_SECRET}`);
    return token;
  } catch (error) {
    console.log("Error while generate token:", error);
  }
};

const MatchPasswordAndGenerateToken = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });
  console.log(`Matching password and generating token for ${user?._id}`)

  if (!user) throw new Error("Invalid Email or password!");

  const hashedPassword = user.password;

  const userProvidedHashed = createHmac("sha256", user.salt!)
    .update(password)
    .digest("hex");

  if (hashedPassword !== userProvidedHashed) {
    throw new Error("Incorrect password!");
  }

  const token = createTokenForUser(user);
  return { user, token };
};
export { createTokenForUser, MatchPasswordAndGenerateToken };
