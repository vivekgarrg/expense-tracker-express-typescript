"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_js_1 = require("../controllers/transaction.js");
const router = express_1.default.Router();
router.route("/transaction").post(transaction_js_1.createTransaction).delete(transaction_js_1.deleteTransaction);
router.route("/allTransactions").get(transaction_js_1.getAllTransactions);
exports.default = router;
