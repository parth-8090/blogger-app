const blogModel = require("../models/blog.model");

module.exports.createBlog = async ({ title, mediaUrl, description }) => {
  if (!title || !description) {
    throw new Error("Title and description are required");
  }
  const blog = blogModel.create({
    title,
    mediaUrl,
    description,
  });
  return blog;
};
