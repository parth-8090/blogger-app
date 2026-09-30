const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

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
