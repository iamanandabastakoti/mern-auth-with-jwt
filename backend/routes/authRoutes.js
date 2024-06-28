const express = require("express");
const router = express.Router();
const {
  testRoute,
  getAllUsers,
  registerUser,
} = require("../controllers/authControllers");

router.get("/", testRoute);
router.get("/users", getAllUsers);
router.post("/register", registerUser);

module.exports = router;
