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
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://react-projects-7ris.onrender.com",
//     ],
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credentials: true,
//     allowedHeaders: ["Content-Type"],
//   }),
// );

const allowedOrigins = [
  "http://localhost:5173",
  "https://react-projects-7ris.onrender.com",
  "https://ws-authentication.netlify.app/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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
