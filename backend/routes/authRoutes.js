const express = require("express");
const router = express.Router();
const {
  testRoute,
  getAllUsers,
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authControllers");

router.get("/", testRoute);
router.get("/users", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

module.exports = router;
