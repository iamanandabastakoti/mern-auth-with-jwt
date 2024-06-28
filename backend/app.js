const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.listen(PORT, () => {
  console.log(`App is running in port:${PORT}`);
});
