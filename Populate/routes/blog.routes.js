import express from "express";
import { createBlog, getBlog } from "../controllers/blog.controllers.js";

const router = express.Router();

router.post("/createBlog", createBlog);
router.get("/allBlogs", getBlog);

export default router;
