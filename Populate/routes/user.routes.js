import express from "express";
import { login, register } from "../controllers/user.controllers.js";

import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("file"), register);
router.post("/login", login);

export default router;
