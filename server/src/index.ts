import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import ConnectToDb from "./db";
import UserRoute from "../routes/user.routes";
import ChatRoute from "../routes/chat.routes";
import MessageRoute from "../routes/message.routes";
import cors from "cors";
import bodyParser from "body-parser";
import User from "../models/user.model";

const app: Express = express();
// const corsoptions = {
//   origin: "http://http://127.0.0.1/:5173",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders: "authorization,content-type",
//   credentials: true,
//   preflightContinue: false,
// };
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb",
    parameterLimit: 50000,
  })
);
dotenv.config();

const port = process.env.PORT || 5000;
const DBUrl = process.env.MONGO_URL;

// Mongo db connection
ConnectToDb(DBUrl);

app.use("/api/users", UserRoute);
app.use("/api/chats", ChatRoute);
app.use("/api/message", MessageRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
