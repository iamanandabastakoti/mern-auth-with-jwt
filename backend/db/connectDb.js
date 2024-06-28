require("dotenv").config();
const mongoose = require("mongoose");

const connectDb = () => {
    console.log("database connected");
  return mongoose.connect(process.env.URI);
};

module.exports = connectDb;
