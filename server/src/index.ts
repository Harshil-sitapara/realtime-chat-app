import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import ConnectToDb from "./db";
import UserRoute from "../routes/user.routes";

const app: Express = express();
app.use(express.json())
dotenv.config();

const port = process.env.PORT || 5000;
const DBUrl = process.env.MONGO_URL;

// Mongo db connection
ConnectToDb(DBUrl);

app.use("/api/users", UserRoute);
app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
