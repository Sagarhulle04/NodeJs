import jwt from "jsonwebtoken";

const checkLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    console.log(token);

    const checkToken = jwt.decode(token, "wisdomsprouts");

    if (!checkToken) {
      return res.status(400).json({ message: "Please Re-Login" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default checkLoggedIn;
