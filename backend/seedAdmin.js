require("dotenv").config();
const mongoose = require("mongoose");
const adminModel = require("./models/admin.model");

mongoose.connect(process.env.DB_CONNECT || "mongodb://localhost:27017/blog-app")
  .then(async () => {
    const email = "admin@devblog.com";
    const password = "adminpassword123";
    
    // Check if exists
    const existing = await adminModel.findOne({ email });
    if (existing) {
      console.log("Admin already exists!");
      process.exit(0);
    }
    
    const hashedPassword = await adminModel.hashedPassword(password);
    await adminModel.create({
      email,
      password: hashedPassword
    });
    
    console.log("Admin created successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.log("DB connection failed:", err);
    process.exit(1);
  });
