import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const user = jwt.verify(token, process.env.secretKey);

    const { id } = user;

    if (!user) {
      return res.status(400).json({ message: "Please Re-Login" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { auth };
