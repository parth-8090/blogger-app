const adminModel = require("../models/admin.model");
const adminService = require("../services/admin.service");
const { validationResult } = require("express-validator");

module.exports.registerAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const isExisting = await adminModel.findOne({ email });

  if (isExisting) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hashedPassword = await adminModel.hashedPassword(password);

  const admin = await adminService.createAdmin({
    email,
    password: hashedPassword,
  });

  const token = admin.generateToken();
  res.cookie("token", token);
  res.status(201).json({ token, admin });
};

module.exports.loginAdmin = async (req, res, next) => { try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const admin = await adminModel.findOne({ email }).select("+password");

  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await admin.comparePassword(password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = admin.generateToken();
  res.cookie("token", token);
  res.status(200).json({ token, admin });
  } catch (err) { res.status(500).json({ error: err.message, stack: err.stack }); }
};

module.exports.getAdminProfile = async (req, res, next) => {
  res.status(200).json(req.admin);
};

module.exports.logoutAdmin = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
