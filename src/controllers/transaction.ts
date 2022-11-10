import express, { Request, Response } from "express";
import expenseModel from "../models/expenseSchema";

import mongoose, { Types } from "mongoose";

//controller for creating a transaction
export const createTransaction = async (req: Request, res: Response) => {
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
};

//controller for deleting a transaction by its id.
export const deleteTransaction = async (req: Request, res: Response) => {
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
};

//controller for getting all the transactions
export const getAllTransactions = async (req: Request, res: Response) => {
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
};
