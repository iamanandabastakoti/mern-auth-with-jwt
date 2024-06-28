const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const testRoute = (req, res) => {
  res.json({ message: "This is a test route" });
};

const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find({});
    console.log("Users found");
    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Unable to retrieve the users data" });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password, salt);
  try {
    const newUser = await User.create({
      username,
      email,
      password: hashed_password,
    });
    console.log("User registered successfully");
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Unable to register the user" });
  }
};

module.exports = {
  testRoute,
  getAllUsers,
  registerUser,
};
