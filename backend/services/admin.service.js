const adminModel = require("../models/admin.model");

module.exports.createAdmin = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  const admin = adminModel.create({
    email,
    password,
  });
  return admin;
};
