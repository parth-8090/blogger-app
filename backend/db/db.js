const mongoose = require("mongoose");

let isConnected = false;
function connectToDb() {
  if(isConnected) return;

  mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("Connected to DB");
      isConnected = true;
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectToDb;
