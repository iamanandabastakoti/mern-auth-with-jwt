const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const connectDb = require("./db/connectDb");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

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
