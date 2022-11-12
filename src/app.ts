import express, { Application, Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

//router
import transactionRouter from "./routes/transaction";

//application
const app: Application = express();

//body parser to parse data from json to js
app.use(bodyParser.json());

//.env configuration
dotenv.config();

//mongoose connection
mongoose
  .connect(process.env.MONGO_URI || "")
  .then((conn) => console.log("connected"))
  .catch((err) => console.log(err));

//routes
app.use("/", transactionRouter);

//port of application
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}.`)
);
