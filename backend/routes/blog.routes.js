const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit for Base64

router.post("/", authMiddleware.authAdmin, upload.single("media"), blogController.createBlog);
router.put("/:id", authMiddleware.authAdmin, upload.single("media"), blogController.updateBlog);
router.delete("/:id", authMiddleware.authAdmin, blogController.deleteBlog);

// Public/User routes
router.get("/", authMiddleware.authUser, blogController.getBlogs);
router.get("/:id", authMiddleware.authUser, blogController.getBlogById);
router.post("/:id/like", authMiddleware.authUser, blogController.likeBlog);
router.post("/:id/share", authMiddleware.authUser, blogController.shareBlog);
router.post("/:id/comment", authMiddleware.authUser, blogController.addComment);

module.exports = router;
