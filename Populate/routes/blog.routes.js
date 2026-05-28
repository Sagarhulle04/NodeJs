import express from "express";

import {
  createBlog,
  deleteAllBlogs,
  getBlog,
} from "../controllers/blog.controllers.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/createBlog", auth, createBlog);
router.get("/allBlogs", auth, getBlog);
router.delete("/deleteBlogs", auth, deleteAllBlogs);

export default router;
