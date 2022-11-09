import mongoose, { Schema, Types } from "mongoose";

//for types of transaction
export interface typeOfTransaction {
  expense: string;
  ammount: number;
  time: Date;
}

//for expense schema
interface expense {
  total: number;
  transaction: Types.DocumentArray<typeOfTransaction>;
}

//expense schema
const expenseSchema = new Schema<expense>({
  total: { type: Number, required: true },
  transaction: [
    {
      expense: String,
      ammount: Number,
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

//expense model
const expenseModel = mongoose.model("expense", expenseSchema);

//exporting default expense model
export default expenseModel;
