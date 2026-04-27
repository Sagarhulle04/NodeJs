import express from "express";
import main from "./db/database.js";
import Fruits from "./models/userSchema.js";
// console.clear();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const fruits = await Fruits.find();
    res.status(200).json(fruits);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.post("/", async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const fruits = await Fruits.create({ name, price, image });
    await fruits.save();
    res.status(201).json({ message: "Fruit created successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fruits = await Fruits.findById({ _id: id });
    res.status(200).json({ fruits });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price } = req.body;
    const fruits = await Fruits.findByIdAndUpdate(
      { _id: id },
      { $set: { name, price, image } },
    );
    res.status(200).json("Fruit Updated Successfully");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fruits = await Fruits.findByIdAndDelete({ _id: id });
    res.status(200).send("Fruit deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

main()
  .then(() => {
    app.listen(3000, () => {
      console.log("server is running");
    });
  })
  .catch((error) => console.log(error));
