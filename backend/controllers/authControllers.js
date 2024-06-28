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
    const usernameExist = await User.findOne({ username });
    const emailExist = await User.findOne({ email });

    if (usernameExist) {
      res.json("Username already exists!");
    } else if (emailExist) {
      res.json("Email is already registered!");
    } else {
      const newUser = await User.create({
        username,
        email,
        password: hashed_password,
      });
      console.log("User registered successfully");
      res.json("Account Created");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Unable to register the user" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.json("User not found!");
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.json("Password Matched");
      } else {
        res.json("Incorrect Password!");
      }
    }
  } catch (error) {
    console.log(error);
    res.json("Unable to login!");
  }
};

module.exports = {
  testRoute,
  getAllUsers,
  registerUser,
  loginUser,
};
