require("dotenv").config();
const mongoose = require("mongoose");
const adminModel = require("./models/admin.model");
const userModel = require("./models/user.model");

// Read from the local .env file
const dbUri = process.env.DB_CONNECT;

if (!dbUri || !dbUri.includes('mongodb+srv')) {
  console.log("ERROR: Your .env file does not contain a MongoDB Atlas link.");
  console.log("Please update your backend/.env file with your Atlas link first!");
  process.exit(1);
}

mongoose.connect(dbUri)
  .then(async () => {
    console.log("Connected to Atlas Cloud Database!");
    
    // Create Admin
    await adminModel.deleteMany({});
    const hashedAdminPass = await adminModel.hashedPassword("admin123");
    await adminModel.create({ email: "admin@gmail.com", password: hashedAdminPass });

    // Create Users
    await userModel.deleteMany({});
    for (let i = 1; i <= 3; i++) {
        const hashedUserPass = await userModel.hashedPassword("pass" + i);
        await userModel.create({ email: "user" + i + "@gmail.com", password: hashedUserPass });
    }

    console.log("Seeding complete! Your cloud database now has the accounts.");
    process.exit(0);
  })
  .catch(err => {
    console.error("MongoDB Atlas connection error:", err);
    process.exit(1);
  });
