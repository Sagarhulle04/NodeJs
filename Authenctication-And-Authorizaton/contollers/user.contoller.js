import User from "../models/user.schema.js";
import bcryt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const isEmail = await User.findOne({ email: email });

    if (isEmail)
      return res.status(400).json({ message: "Email already exists" });

    if (!name || !email || !password)
      return res.status(400).json({ message: "All Fields Are Required" });

    const hashedPassword = await bcryt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(200).json({ message: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "All Fields Are Required" });

    const user = await User.findOne({ email });

    const { name, email: userEmail, role } = user;
    console.log(name, userEmail);

    if (!user.email)
      return res.status(400).json({ message: "Invalid Credentails" });

    const correctPassword = await bcryt.compare(password, user.password);

    if (!correctPassword)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.secretToken,
      { expiresIn: "2h" },
    );

    res.status(200).json({ message: { name, userEmail, role }, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifiedUser = async (req, res) => {
  try {
    const { id } = req.user;

    const userDetails = await User.findById(id);

    res.status(200).json({ message: userDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { register, login, verifiedUser };
