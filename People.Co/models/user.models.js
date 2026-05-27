import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  dob: {
    type: Date,
  },
  mobileNumber: {
    type: String,
  },
  nationality: {
    type: String,
  },
  role: {
    type: String,
    enum: [
      "product-designer",
      "product-manager",
      "frontend-developer",
      "backend-developer",
    ],
  },
  teams: {
    type: String,
    enum: ["Design", "Product", "Marketing", "Technology"],
  },
  status: {
    type: String,
    enum: ["active", "inactive", "pending"],
  },
  image: {
    type: String,
    photo: "",
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbTu4diIJv94P-8WTWuUSn3zhn5oU5flJmQA&s",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
