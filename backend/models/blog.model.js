const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  name: String,
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mediaUrl: { type: String },
  description: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  shares: { type: Number, default: 0 },
  comments: [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model("blog", blogSchema);
