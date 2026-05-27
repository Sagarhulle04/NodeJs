import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const user = jwt.verify(token, process.env.secretKey);
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
