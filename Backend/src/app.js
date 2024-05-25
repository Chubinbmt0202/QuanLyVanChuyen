const express = require("express");
const cors = require("cors");
const app = express();
const database = require("./Configs/database");
const { createUser, login } = require("./Controllers/UserController.js");
const {
  getAllTraffics,
  addTrafficsController,
  getTrafficById,
  deleteTrafficController,
  updateTrafficController,
  searchTrafficByLicensePlateController,
} = require("./Controllers/trafficController.js");
const { getAllVehicleTypes } = require("./Controllers/typesVehicleController.js");
const { getAllOrders, getDetailOrderByID } = require("./Controllers/orderController.js");

app.use(express.json());
app.use(cors()); // Thêm middleware cors vào ứng dụng Express

// Database connection
try {
  database;
  console.log("Connected to the database");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Routes
app.post("/api/register", createUser);
app.post("/api/login", login);

// traffic
app.get("/api/getAllTraffics", getAllTraffics);
app.post("/api/addTraffics", addTrafficsController);
app.get("/api/getTraffic/:id", getTrafficById);
app.delete("/api/deleteTraffic/:id", deleteTrafficController);
app.put("/api/updateTraffic/:id", updateTrafficController);
app.get(
  "/api/searchTrafficByLicensePlate/:licensePlate",
  searchTrafficByLicensePlateController
);

// loại xe
app.get("/api/getAllVehicleTypes", getAllVehicleTypes);

// Đơn hàng
app.get("/api/getAllOrders", getAllOrders);
app.get("/api/getDetailOrderByID/:id", getDetailOrderByID);

module.exports = app;
