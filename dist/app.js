"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenseSchema_1 = __importDefault(require("./models/expenseSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
mongoose_1.default
    .connect("mongodb+srv://admin:vivek123@cluster0.sabdy.mongodb.net/expense-tracker")
    .then((conn) => console.log("connected"))
    .catch((err) => console.log(err));
app.post("/transaction", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ammount = req.body.ammount; //extracting the ammount from body of the request
        let Text;
        if (ammount > 0) {
            Text = "Credit";
        }
        else {
            Text = "Debit";
        }
        const data = yield expenseSchema_1.default.create({ ammount: ammount, text: Text });
        res.status(201).json({
            message: "success",
            data: data,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "error",
            error: error,
        });
    }
}));
app.get("/allTransactions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield expenseSchema_1.default.find();
        const totalTrandactions = yield expenseSchema_1.default.count({});
        res.status(200).json({
            message: "success",
            totalTrandactions,
            data,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "error",
            error,
        });
    }
}));
app.delete("/transaction", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const data = yield expenseSchema_1.default.findByIdAndDelete(id, { new: true });
        if (data) {
            res.status(200).json({
                messsage: "deleted successfully",
            });
        }
        else {
            res.status(404).json({
                messsage: "User not found.",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "error",
            error,
        });
    }
}));
//port of application
app.listen(5000, () => console.log("Server is running."));
