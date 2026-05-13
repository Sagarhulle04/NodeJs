import express from "express";
import { login, signUp, verifyUser } from "../controllers/user.controllers.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/", auth, verifyUser);

export default router;
