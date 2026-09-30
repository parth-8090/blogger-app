const userModel = require("../models/user.model");

module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  
  const isValid = await user.comparePassword(password);
  if (!isValid) return res.status(401).json({ message: "Invalid credentials" });
  
  const token = user.generateToken();
  res.status(200).json({ token, user: { email: user.email, id: user._id } });
};
