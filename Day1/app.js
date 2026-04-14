import express from "express";

const app = express();

app.use(express.urlencoded({ extended: "true" }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Get method is running on /" });
});

app.post("/", (req, res) => {
  const { name, rollNo } = req.body;
  const obj = {
    id: Date.now(),
    name,
    rollNo,
  };
  const arr = [];
  arr.push(obj);
  res.status(201).json({ message: arr });
});

app.listen(3000, () => {
  console.log("server is running");
});
