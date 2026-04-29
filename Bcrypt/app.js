import express from "express";
import main from "./db/index.js";
import bcrypt from "bcrypt";
import User from "./models/user.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ quiet: true });

// Routes
import userRouter from "./router/user.routes.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);

// const PORT = process.env.PORT || 4000;

main()
  .then(() => {
    app.listen(3000, () => {
      console.log(`server listening on the port `);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
