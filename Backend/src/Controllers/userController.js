// src/Controllers/userController.js
const userService = require("../Services/userService");
const { registerUser, loginUser } = require("../Services/userService");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
};

const createUser = async (req, res) => {
  try {
    console.log("Registering user:", req.query);

    const { Username, PassWord, SDT, ID_role } = req.query;

    const userId = await registerUser({
      Username: Username,
      PassWord: PassWord,
      SDT: SDT,
      ID_role: ID_role,
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      userId: userId,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    console.error("Error during registration:", error);

    // Handling specific validation errors
    if (error.message === "Username, password, and SDT are required.") {
      res.status(400).json({ success: false, message: error.message });
    } else if (
      error.message === "Password must be at least 6 characters long."
    ) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      // Handling other errors
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
};

const login = async (req, res) => {
  try {
    const { Username, PassWord } = req.query;
    console.log("Logging in user:", req.query);

    const user = await loginUser({ Username, PassWord });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error during login:", error);

    // Handling specific validation errors
    if (error.message === 'Username and password are required.' || error.message === 'Invalid username or password.') {
      res.status(400).json({ success: false, message: error.message });
    } else {
      // Handling other errors
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
};
module.exports = {
  getUsers,
  createUser,
  login
};
