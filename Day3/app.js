import express from "express";
import dotenv from "dotenv";

dotenv.config({ quiet: true });
// console.clear();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  try {
    res.send("Get request");
  } catch (error) {
    res.status(500).json({ message: error.message });
    process.exit(1);
  }
});

app.post("/", (req, res) => {
  try {
    const arr = [];
    const obj = {
      id: Date.now(),
      name: "Sagar",
    };
    arr.push(obj);
    res.status(201).json({ message: arr });
  } catch (error) {
    res.status(500).json({ message: error.message });
    process.exit(1);
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
