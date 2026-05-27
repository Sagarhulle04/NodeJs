import express from "express";
import dotenv from "dotenv";
import main from "./db/index.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";

dotenv.config({ quiet: true });
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", userRouter);

const PORT = process.env.PORT;

main()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
