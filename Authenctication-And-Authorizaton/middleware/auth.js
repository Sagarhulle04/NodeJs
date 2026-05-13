import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const loggedIn = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(200).json({ message: "Please enter a token" });
    }

    const decoded = jwt.verify(token, process.env.secretToken);

    const user = decoded;

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const studentMiddleware = (req, res, next) => {
  try {
    if (req.user.role == "student") {
      next();
    } else {
      res
        .status(400)
        .json({ message: "You are no accessed for the student middleware" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const teacherMiddleware = (req, res, next) => {
  try {
    if (req.user.role == "teacher") {
      next();
    } else {
      res
        .status(400)
        .json({ message: "You are no accessed for the teacher middleware" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const adminMiddleware = (req, res, next) => {
  try {
    if (req.user.role == "admin") {
      next();
    } else {
      res
        .status(400)
        .json({ message: "You are no accessed for the admin middleware" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
