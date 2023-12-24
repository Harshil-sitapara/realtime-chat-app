import mongoose from "mongoose";

const ConnectToDb = async (url: any) => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to MongoDb");
    })
    .catch((err) => {
      console.log("Connection Error:", err.message);
    });
};

export default ConnectToDb;
