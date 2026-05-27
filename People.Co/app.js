import express from "express";
import dotenv from "dotenv";
import main from "./db/index.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";

const app = express();
dotenv.config({ quiet: true });

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use("/", userRouter);

main()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
