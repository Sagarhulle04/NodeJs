import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";
dotenv.config({ quiet: true });

// console.clear();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }),
);

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

app.get("/", (req, res) => {
  try {
    db.query("select * from car_info", (error, request) => {
      if (error) return res.status(400).send({ message: error.message });
      res.status(200).send({ data: request });
    });
  } catch (error) {
    res.status(500).send({ data: error.message });
  }
});

app.post("/add", (req, res) => {
  try {
    const { name, image, description } = req.body;
    db.query(
      "INSERT INTO car_info (name, image, description) VALUES (?, ?, ?)",
      [name, image, description],
      (error, request) => {
        if (error) return res.status(400).send({ data: error.message });
        res.status(200).send({ data: "Car Added Successfully" });
      },
    );
  } catch (error) {
    res.status(500).send({ data: error.message });
  }
});
app.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    db.query("select * from car_info where id = ?", [id], (error, request) => {
      if (error) return res.status(400).send({ data: error.message });
      res.status(200).send({ data: request });
    });
  } catch (error) {
    res.status(500).send({ data: error.message });
  }
});

app.put("/update/:id", (req, res) => {
  try {
    const id = req.params.id;
    const { name, image, description } = req.body;
    db.query(
      `UPDATE car_info SET name= ?, image= ?, description= ? WHERE id = ?`,
      [name, image, description, id],
      (error, request) => {
        if (error) return res.status(400).send({ data: error.message });
        res.status(200).send({ data: "Car Updated Successfully" });
      },
    );
  } catch (error) {
    res.status(500).send({ data: error.message });
  }
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  try {
    db.query(`delete from car_info where id = ${id}`, (error, request) => {
      if (error) return res.status(400).send(error.message);
      res.status(200).send({ data: "Car Removed Successfully" });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
