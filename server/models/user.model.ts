import { createHmac, randomBytes } from "crypto";
import mongoose, { Document, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    salt: { type: String },
    profilePhoto: { type: Object, require: true },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;
  //generating the random 16 string
  const salt = randomBytes(16).toString();

  // hashing the password
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password as string)
    .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
