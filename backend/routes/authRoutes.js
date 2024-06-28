const express = require("express");
const router = express.Router();
const {
  testRoute,
  getAllUsers,
  registerUser,
  loginUser,
} = require("../controllers/authControllers");

router.get("/", testRoute);
router.get("/users", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
