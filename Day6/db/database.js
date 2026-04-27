import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/WS");
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
}

export default main;
