import express from "express";
import { login, register, verifiedUser } from "../contollers/user.contoller.js";
import {
  adminMiddleware,
  loggedIn,
  studentMiddleware,
  teacherMiddleware,
} from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/student", loggedIn, studentMiddleware, verifiedUser);
router.get("/teacher", loggedIn, teacherMiddleware, verifiedUser);
router.get("/admin", loggedIn, adminMiddleware, verifiedUser);

export default router;
