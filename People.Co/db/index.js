import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

async function main() {
  await mongoose.connect(`${process.env.mongodbURL}/people`);
}

main()
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log("database not connected", err.message);
  });

export default main;
