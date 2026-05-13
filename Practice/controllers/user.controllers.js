import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const foundEmail = await User.findOne({ email });

    if (foundEmail)
      return res.status(400).json({ message: "Email already exists" });

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User Created Successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const token = jwt.sign({ id: user._id, role: user.role }, "secretToken", {
        expiresIn: "2h",
      });

      return res.status(200).json({ message: user, token });
    }

    res.status(400).json({ message: "Invalid Credentails" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyUser = async (req, res) => {
  res.status(200).json({ message: "User Verified" });
};

export { signUp, login, verifyUser };
