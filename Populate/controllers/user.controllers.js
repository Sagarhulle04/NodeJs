import express from "express";
import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ quiet: true });

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const file = req.file;
  try {
    console.log(name, email, password, file);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const url = "http://localhost:3000/uploads/" + file.filename;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      photoURL: url,
    });

    return res
      .status(201)
      .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    const checkPassword = await bcrypt.compare(password, existingUser.password);

    if (checkPassword) {
      const token = jwt.sign({ id: existingUser._id }, process.env.secretKey, {
        expiresIn: "2h",
      });

      return res.status(201).json({
        success: true,
        message: "Logged in successfully",
        existingUser,
        token,
      });
    }

    res.status(400).json({ success: false, message: "Invalid Credentails" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { register, login };
