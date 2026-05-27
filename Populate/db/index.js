import mongoose from "mongoose";

async function main() {
  await mongoose.connect(process.env.mongodb);
}

export default main;
