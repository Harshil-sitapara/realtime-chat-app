import JWT from "jsonwebtoken";

const createTokenForUser = (createdUser: any) => {
  try {
    const payload = {
      id: createdUser._id,
      email: createdUser.email,
    };
    const token = JWT.sign(payload, `${process.env.JWT_SECRET}`);
    return token;
  } catch (error) {
    console.log("Error while generate token:", error);
  }
};

export { createTokenForUser };
