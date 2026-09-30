const blogModel = require("../models/blog.model");

module.exports.createBlog = async (req, res) => {
  const { title, description } = req.body;
  let mediaUrl = req.body.mediaUrl;
  
  if (req.file) {
    mediaUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }

  const blog = await blogModel.create({ title, mediaUrl, description });
  res.status(201).json(blog);
};

module.exports.updateBlog = async (req, res) => {
  const updateData = { ...req.body, likes: [], comments: [], shares: 0 };
  if (req.file) {
    updateData.mediaUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }

  const blog = await blogModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.status(200).json(blog);
};

module.exports.deleteBlog = async (req, res) => {
  await blogModel.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Deleted" });
};

module.exports.getBlogs = async (req, res) => {
  const blogs = await blogModel.find().sort({ createdAt: -1 }).populate('comments.user', 'email').populate('likes', 'email');
  res.status(200).json(blogs);
};

module.exports.getBlogById = async (req, res) => {
  const blog = await blogModel.findById(req.params.id).populate('comments.user', 'email').populate('likes', 'email');
  res.status(200).json(blog);
};

module.exports.likeBlog = async (req, res) => {
  const blog = await blogModel.findById(req.params.id);
  const userId = req.user._id;
  if (blog.likes.includes(userId)) {
      blog.likes.pull(userId);
  } else {
      blog.likes.push(userId);
  }
  await blog.save();
  res.status(200).json(blog);
};

module.exports.addComment = async (req, res) => {
  const blog = await blogModel.findById(req.params.id);
  blog.comments.push({ user: req.user._id, text: req.body.text, name: req.user.email });
  await blog.save();
  res.status(200).json(blog);
};

module.exports.shareBlog = async (req, res) => {
  const blog = await blogModel.findById(req.params.id);
  blog.shares += 1;
  await blog.save();
  res.status(200).json(blog);
};
