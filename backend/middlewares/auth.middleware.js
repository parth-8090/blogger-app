const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin.model");
const userModel = require("../models/user.model");

module.exports.authAdmin = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await adminModel.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.admin = admin;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      const admin = await adminModel.findById(decoded.id);
      if(!admin) return res.status(401).json({ message: "Unauthorized" });
      req.user = admin; // Fallback to let admins view/edit
      return next();
    }

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
