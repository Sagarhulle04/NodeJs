import express from "express";
import {
  addMember,
  editProfile,
  hello,
  login,
  register,
} from "../controllers/user.controllers.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", auth, hello);
router.put("/editProfile", auth, editProfile);
router.post("/addMember", auth, addMember);

export default router;
