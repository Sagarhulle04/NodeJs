import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

async function main() {
  await mongoose.connect(`${process.env.mongodbURL}/practice`);
}

main()
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log("database is not connected", err.message);
  });

export default main;
