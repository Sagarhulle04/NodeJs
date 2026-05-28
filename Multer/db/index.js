import mongoose from "mongoose";

const main = async (req, res) => {
  await mongoose.connect("mongodb://localhost:27017/multer");
};

export default main;
