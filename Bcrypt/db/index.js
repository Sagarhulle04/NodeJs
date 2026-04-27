import mongoose from "mongoose";

async function main() {
  await mongoose.connect("mongodb://localhost:27017/WS");
}

main()
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log("database not connected");
  });

export default main;
