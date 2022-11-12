"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
//router
const transaction_1 = __importDefault(require("./routes/transaction"));
//application
const app = (0, express_1.default)();
//body parser to parse data from json to js
app.use(body_parser_1.default.json());
//.env configuration
dotenv_1.default.config();
//mongoose connection
mongoose_1.default
    .connect(process.env.MONGO_URI || "")
    .then((conn) => console.log("connected"))
    .catch((err) => console.log(err));
//routes
app.use("/", transaction_1.default);
//port of application
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}.`));
