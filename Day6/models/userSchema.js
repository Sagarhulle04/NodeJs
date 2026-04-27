import mongoose from "mongoose";

const fruitInfoSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: String },
    image: { type: String },
  },
  { timestamps: true },
);

const Fruits = mongoose.model("Fruits", fruitInfoSchema);

export default Fruits;
