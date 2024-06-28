const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
app.use(express.json());
const connectDb = require("./db/connectDb");

//importing the routes
const auth_routes = require("./routes/authRoutes");

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.use("/auth", auth_routes);

const start = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`App is running in port:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
