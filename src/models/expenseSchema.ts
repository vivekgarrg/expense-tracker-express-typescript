import mongoose, { Schema } from "mongoose";

//for expense schema
interface expense {
  ammount: number;
  text: string;
  createdAt: Date;
}

//expense schema
const expenseSchema = new Schema<expense>({
  ammount: { type: Number, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

//expense model
const expenseModel = mongoose.model("expense", expenseSchema);

//exporting default expense model
export default expenseModel;
