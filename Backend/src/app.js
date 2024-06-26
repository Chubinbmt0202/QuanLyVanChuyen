const express = require("express");
const cors = require("cors");
const app = express();
const database = require("./Configs/database");
const { createUser, login, getDriverIdleController ,deleteUserAccount} = require("./Controllers/UserController.js");
const {
  getAllTraffics,
  addTrafficsController,
  getTrafficById,
  deleteTrafficController,
  updateTrafficController,
  searchTrafficByLicensePlateController,
  getVehicleIdleController,
} = require("./Controllers/trafficController.js");
const { getAllVehicleTypes } = require("./Controllers/typesVehicleController.js");
const { getAllOrders, getDetailOrderByID, updateOrderController,getOrderByIdKH, getOrderDetailFinishedController } = require("./Controllers/orderController.js");
const { getAllCustomersController,getinforCustomerByID } = require("./Controllers/CustomerController.js");
const {getAllDataShipper} = require("./Controllers/ChartController.js")
const {getAllDriver,getAllEmployee,updateEmployee,addDriver,getInforDriverByID,updateDriverByID} = require("./Controllers/employeeController.js")
const {loginDriverController, rejectOrderController, getDetailDriverController, getDetailOrderController, confirmOrderController} = require("./Controllers/driverController.js")

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
app.post("/api/loginDriver", loginDriverController);
app.post("/api/getDetailDriver", getDetailDriverController);

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
app.get("/api/getVehicleIdle", getVehicleIdleController);

// loại xe
app.get("/api/getAllVehicleTypes", getAllVehicleTypes);

// tài xế
app.get("/api/getAllDriversIdle", getDriverIdleController);
app.get("/api/getDetailOrder/:PK_Id_DonHang/:ID_TX", getDetailOrderController);
app.post("/api/confirmOrder", confirmOrderController);
app.post("/api/rejectOrder", rejectOrderController);

// Đơn hàng
app.get("/api/getAllOrders", getAllOrders);
app.get("/api/getDetailOrderByID/:id", getDetailOrderByID);
app.post("/api/updateOrder", updateOrderController);
app.get("/api/getOrderByIdKH/:id",getOrderByIdKH)
app.get("/api/getOrderDetailFinished/:id", getOrderDetailFinishedController);


// khách hàng
app.get("/api/getAllCustomers", getAllCustomersController); 
app.get("/api/getinforCustomerByID/:id",getinforCustomerByID);


//Chart Report
app.get("/api/getAllReportShipers",getAllDataShipper);

//Employee
app.get("/api/getAllDriver",getAllDriver);
app.get("/api/getAllEmployee",getAllEmployee);
app.put("/api/updateEmployee/:id",updateEmployee)
app.post("/api/addDriver",addDriver)
app.get("/api/getInforDriverByID/:id",getInforDriverByID);
app.put("/api/updateDriverByID/:id",updateDriverByID);


//User
app.delete("/api/deleteUserAccount/:id",deleteUserAccount)
module.exports = app;
