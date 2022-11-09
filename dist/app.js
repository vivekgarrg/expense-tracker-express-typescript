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
app.get("/newUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield expenseSchema_1.default.create({ total: 0, transaction: [] });
    res.status(201).json({
        message: "User Created Success",
        data: response,
    });
}));
app.post("/transaction", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ammount = req.body.ammount; //extracting the ammount from body of the request
    const id = req.body.id; //extracting id from request
    //finding the object by the id.
    const response = yield expenseSchema_1.default.findById(id);
    const prevTotal = (response === null || response === void 0 ? void 0 : response.total) || 0;
    const prevTransaction = (response === null || response === void 0 ? void 0 : response.transaction) || [];
    //if there is no such user with that id.
    if (!response) {
        res.status(401).json("User not found");
    }
    //amount > 0 (credit)
    if (ammount > 0) {
        //new ammount to be updated
        let newAmmount = prevTotal + ammount;
        //new transaction array to be updated
        let newTransaction = [
            ...prevTransaction,
            { expense: "credit", ammount: ammount },
        ];
        //updated data
        const data = yield expenseSchema_1.default.findByIdAndUpdate(id, {
            total: newAmmount,
            transaction: newTransaction,
        }, { new: true });
        //sending response
        res.status(200).json(data);
    }
    //if ammount <0 (debit)
    else {
        let newAmmount = prevTotal + ammount;
        let newTransaction = [
            ...prevTransaction,
            { expense: "debit", ammount: ammount },
        ];
        const data = yield expenseSchema_1.default.findByIdAndUpdate(id, {
            total: newAmmount,
            transaction: newTransaction,
        }, { new: true });
        res.status(200).json(data);
    }
}));
//port of application
app.listen(5000, () => console.log("Server is running."));
