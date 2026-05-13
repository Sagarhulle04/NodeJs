import express, { Router } from "express";
import {
  loggedInUser,
  login,
  register,
  verifyToken,
} from "../controllers/user.controllers.js";
import checkLoggedIn from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verifyToken", verifyToken);
router.get("/", checkLoggedIn, loggedInUser);

export default router;
