"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_1 = require("../controllers/transaction");
const router = express_1.default.Router();
//transaction route (post and delete request)
router.route("/transaction").post(transaction_1.createTransaction).delete(transaction_1.deleteTransaction);
//allTransaction route to get all transactions.
router.route("/allTransactions").get(transaction_1.getAllTransactions);
exports.default = router;
