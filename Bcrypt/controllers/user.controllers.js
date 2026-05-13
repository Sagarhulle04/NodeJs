import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const userExists = await User.findOne({ email: email });

    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Account doesnt exists" });

    if (!email || !password)
      return res.status(400).json({ message: "Enter all the fields" });

    const { password: isPassword } = user;

    const checkPassword = await bcrypt.compare(password, isPassword);
    if (!checkPassword)
      return res.status(400).json({ message: "Invalid Credentails" });

    const token = jwt.sign({ id: user._id }, "wisdomsprouts");

    res.status(200).json({ message: user, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.body;

  try {
    const decodeToken = jwt.decode(token, "wisdomsprouts");
    console.log(decodeToken);

    if (!decodeToken)
      return res
        .status(400)
        .json({ message: "Token is invalid. Please add a valid token" });

    res
      .status(200)
      .json({ messgae: "Token is decoded please check the console" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loggedInUser = async (req, res) => {
  try {
    res.status(200).json({ message: "You can check details in the profile" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { register, login, verifyToken, loggedInUser };
