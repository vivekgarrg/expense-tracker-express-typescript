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

app.get("/newUser", async (req: Request, res: Response) => {
  const response = await expenseModel.create({ total: 0, transaction: [] });
  res.status(201).json({
    message: "User Created Success",
    data: response,
  });
});

app.post("/transaction", async (req: Request, res: Response) => {
  const ammount: number = req.body.ammount; //extracting the ammount from body of the request
  const id: Types.ObjectId = req.body.id; //extracting id from request

  //finding the object by the id.
  const response = await expenseModel.findById(id);
  const prevTotal: number = response?.total || 0;
  const prevTransaction: any[] = response?.transaction || [];

  //if there is no such user with that id.
  if (!response) {
    res.status(401).json("User not found");
  }

  //amount > 0 (credit)
  if (ammount > 0) {
    //new ammount to be updated
    let newAmmount: number = prevTotal + ammount;
    //new transaction array to be updated
    let newTransaction = [
      ...prevTransaction,
      { expense: "credit", ammount: ammount },
    ];

    //updated data
    const data = await expenseModel.findByIdAndUpdate(
      id,
      {
        total: newAmmount,
        transaction: newTransaction,
      },
      { new: true }
    );

    //sending response
    res.status(200).json(data);
  }
  //if ammount <0 (debit)
  else {
    let newAmmount: number = prevTotal + ammount;
    let newTransaction = [
      ...prevTransaction,
      { expense: "debit", ammount: ammount },
    ];

    const data = await expenseModel.findByIdAndUpdate(
      id,
      {
        total: newAmmount,
        transaction: newTransaction,
      },
      { new: true }
    );

    res.status(200).json(data);
  }
});

//port of application
app.listen(5000, () => console.log("Server is running."));
