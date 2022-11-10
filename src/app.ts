import express, { Application, Request, Response, NextFunction } from "express";
import expenseModel from "./models/expenseSchema";
import mongoose, { Types } from "mongoose";
import bodyParser from "body-parser";

const app: Application = express();

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://admin:vivek123@cluster0.sabdy.mongodb.net/expense-tracker"
  )
  .then((conn) => console.log("connected"))
  .catch((err) => console.log(err));

app.post("/transaction", async (req: Request, res: Response) => {
  try {
    const ammount: number = req.body.ammount; //extracting the ammount from body of the request
    let Text: string;
    if (ammount > 0) {
      Text = "Credit";
    } else {
      Text = "Debit";
    }
    const data = await expenseModel.create({ ammount: ammount, text: Text });
    res.status(201).json({
      message: "success",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error: error,
    });
  }
});

app.get("/allTransactions", async (req: Request, res: Response) => {
  try {
    const data = await expenseModel.find();
    const totalTrandactions = await expenseModel.count({});
    res.status(200).json({
      message: "success",
      totalTrandactions,
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
});

app.delete("/transaction", async (req: Request, res: Response) => {
  try {
    const id: Types.ObjectId = req.body.id;
    const data = await expenseModel.findByIdAndDelete(id, { new: true });

    if (data) {
      res.status(200).json({
        messsage: "deleted successfully",
      });
    } else {
      res.status(404).json({
        messsage: "User not found.",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
});

//port of application
app.listen(5000, () => console.log("Server is running."));
