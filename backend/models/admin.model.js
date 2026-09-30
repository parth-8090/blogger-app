const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  }
});

adminSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
  return token;
};

adminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.statics.hashedPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
