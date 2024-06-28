const express = require("express");
const router = express.Router();
const { testRoute } = require("../controllers/authControllers");

router.get("/", testRoute);


module.exports = router;
