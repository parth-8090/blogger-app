const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
], adminController.registerAdmin);

router.post("/login", [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
], adminController.loginAdmin);

router.get("/profile", authMiddleware.authAdmin, adminController.getAdminProfile);
router.get("/logout", authMiddleware.authAdmin, adminController.logoutAdmin);

router.get("/fix-db", async (req, res) => { 
    try {
      const adminModel = require("../models/admin.model"); 
      await adminModel.deleteMany({}); 
      const hashed = await adminModel.hashedPassword("admin123"); 
      await adminModel.create({ email: "admin@gmail.com", password: hashed }); 
      res.send("Admin DB Fixed on Vercel!"); 
    } catch(err) {
      res.status(500).send(err.message);
    }
  });

module.exports = router;
