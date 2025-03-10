const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const { name, username, email, password } = req.body;
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
        name,
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
      res.json({ error: "User not found!" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        jwt.sign(
          {
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production", // Only set secure in production
                maxAge: 24 * 60 * 60 * 1000, // expiration time (1 day in this example)
              })
              .json({
                id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
              });
          }
        );
      } else {
        res.json({ error: "Incorrect Password!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.json("Unable to login!");
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json("No cookie found");
  }
};

module.exports = {
  testRoute,
  getAllUsers,
  registerUser,
  loginUser,
  getProfile,
};
