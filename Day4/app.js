import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";

const app = express();
dotenv.config({ quiet: true });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.db,
});

if (db) {
  console.log("database is connected");
}

app.get("/", (req, res) => {
  try {
    db.query("select * from flower_info", (error, result) => {
      if (error) return res.status(400).json({ message: error.message });

      res.status(200).json({ message: result });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/add", (req, res) => {
  try {
    const { name, photo } = req.body;
    db.query(
      `insert into flower_info (name, photo) values ('${name}', '${photo}')`,
      (error, result) => {
        if (error) return res.status(400).json({ message: error.message });

        res.status(200).json({ message: "Flower added successfully" });
      },
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/update/:id", (req, res) => {
  try {
    const id = req.params.id;
    const { name, photo } = req.body;
    db.query(
      `update flower_info set name = '${name}', photo = '${photo}' where id = ${id} `,
      (error, result) => {
        if (error) return res.status(400).json({ message: error.message });
        res.status(200).json({ message: "flower updated successfully" });
      },
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/flower/:id", (req, res) => {
  try {
    const id = req.params.id;
    db.query(`delete from flower_info where id = ${id}`, (error, result) => {
      if (error) return res.status(400).json({ message: error.message });

      res.status(200).json({ message: "flower deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
