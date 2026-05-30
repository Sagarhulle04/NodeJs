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

const likeCount = async (req, res) => {
  try {
    const { id, status } = req.params;
    const loggedIn = req.user.id;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (status === "like") {
      const alreadyLiked = blog.like.some(
        (userId) => userId.toString() === loggedIn.toString(),
      );

      if (!alreadyLiked) {
        blog.like.push(loggedIn);
      }
    }

    if (status === "unLike") {
      blog.like = blog.like.filter(
        (userId) => userId.toString() !== loggedIn.toString(),
      );
    }

    await blog.save();

    res.status(200).json({
      likes: blog.like.length,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { createBlog, getBlog, deleteAllBlogs, likeCount };
