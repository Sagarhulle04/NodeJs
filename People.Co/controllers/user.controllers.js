import express from "express";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const app = express();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const registedUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ success: true, message: registedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user.email) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentails" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentails" });
    }
    const token = jwt.sign({ id: user._id }, process.env.secretKey, {
      expiresIn: "2d",
    });

    return res.status(200).json({ success: true, message: { user, token } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const hello = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Main Dashobard Page" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      image,
      gender,
      dob,
      mobileNumber,
      nationality,
      role,
      teams,
      status,
    } = req.body;

    const { id } = req.user;
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        image,
        gender,
        dob,
        mobileNumber,
        nationality,
        role,
        teams,
        status,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const {
      name,
      email,
      image,
      gender,
      dob,
      password,
      mobileNumber,
      nationality,
      role,
      teams,
      status,
    } = req.body;

    const isEmail = await User.findOne({ email });

    if (isEmail)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      image,
      gender,
      dob,
      password: hashedPassword,
      mobileNumber,
      nationality,
      role,
      teams,
      status,
    });

    res.status(200).json({
      success: true,
      message: "Member added successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
