import express from "express";
import userRoute from "./routes/user.routes.js";
import blogRoute from "./routes/blog.routes.js";
import cors from "cors";

import dotenv from "dotenv";
import main from "./db/index.js";
dotenv.config({ quiet: true });

const app = express();
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", userRoute);
app.use("/", blogRoute);

main()
  .then(() => {
    console.log("database connected successfully");
    app.listen(process.env.PORT, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log("database connection not established", err.message);
  });
