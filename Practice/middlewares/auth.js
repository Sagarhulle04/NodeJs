import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Please Re-Login",
      });
    }

    const decodedMessage = jwt.verify(token, "secretToken");

    const { id } = decodedMessage;

    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    console.log(req.user);

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Please Re-login",
    });
  }
};

export { auth };
