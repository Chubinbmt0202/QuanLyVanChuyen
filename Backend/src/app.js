const express = require("express");
const cors = require("cors");
const app = express();
const database = require("./Configs/database");
const { createUser, login } = require("./Controllers/UserController.js");

app.use(express.json());
app.use(cors()); // Thêm middleware cors vào ứng dụng Express

// Database connection
try {
  database;
  console.log("Connected to the database");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Middlewares
app.post("/api/register", createUser);
app.post("/api/login", login);

module.exports = app;
