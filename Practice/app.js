import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import main from "./db/index.js";
import userRouter from "./routes/user.routes.js";

dotenv.config({ quiet: true });

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", userRouter);

main()
  .then(() => {
    app.listen(3000, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
