import mongoose from "mongoose";

async function main() {
  await mongoose.connect(
    "mongodb+srv://sagarhulle22:sagarhulle22@cluster0.ytw8il6.mongodb.net/",
  );
}

main()
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log("database not connected");
  });

export default main;
