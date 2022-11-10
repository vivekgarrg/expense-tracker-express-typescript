import express, { Router, Request, Response } from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
} from "../controllers/transaction.js";

const router: Router = express.Router();
//transaction route (post and delete request)
router.route("/transaction").post(createTransaction).delete(deleteTransaction);
//allTransaction route to get all transactions.
router.route("/allTransactions").get(getAllTransactions);

export default router;
