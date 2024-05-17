const express = require("express");
const app = express();
const database = require("./Configs/database");
const { createUser } = require("./Controllers/UserController");


// Database connection
try {
  database;
  console.log("Connected to the database");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Middlewares
app.post("/api/register", createUser);
module.exports = app;
