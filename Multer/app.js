import express from "express";
import multer from "multer";
import main from "./db/index.js";
import User from "./models/user.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/register", upload.single("file"), async (req, res) => {
  const { name, email, password } = req.body;
  const imageURL = req.file.filename;

  const url = "http://localhost:3000/uploads/" + imageURL;
  const user = await User.create({ name, email, password, photoURL: url });
  res.status(200).json({ user });
});

main()
  .then(() => {
    console.log("database connected successfully");
    app.listen(3000, () => {
      console.log("server is running on the port 3000");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
