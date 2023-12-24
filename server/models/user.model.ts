import { createHmac, randomBytes } from "crypto";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);


userSchema.pre("save", function (next) {
  const user = this; // here 'this' is pointing to the current user

  if (!user.isModified("password")) return;
  //generating the random 16 string
  const salt = randomBytes(16).toString();

  // hashing the password
  const hashedPassword = createHmac("sha256", salt) // 'sha256' is algorithm
    .update(user.password as string)
    .digest("hex");

  this.password = hashedPassword; //here we are replacing original password with hashed password
  next();
});

const User = mongoose.model("User", userSchema);


export default User;
