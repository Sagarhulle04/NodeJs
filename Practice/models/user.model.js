import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Name is required"],
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
