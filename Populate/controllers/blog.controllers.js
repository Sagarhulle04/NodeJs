import Blog from "../models/blog.schema.js";

const createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    if (!title || !content) {
      return res
        .status(500)
        .json({ success: false, message: "Enter all the fields" });
    }

    const blog = await Blog.create({ title, content, user: req.user.id });

    res
      .status(200)
      .json({ success: true, message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBlog = async (req, res) => {
  try {
    const blog = await Blog.find().populate("user", "name -_id");
    const user = req.user;

    res.status(200).json({
      success: true,
      message: "All Blogs",
      count: blog.length,
      blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAllBlogs = async (req, res) => {
  try {
    const data = await Blog.deleteMany();
    res.status(200).json({ message: "All Blogs deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createBlog, getBlog, deleteAllBlogs };
