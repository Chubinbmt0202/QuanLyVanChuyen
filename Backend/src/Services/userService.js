// src/Services/userService.js
const userModel = require("../Models/userModel");

const getUsers = async () => {
  try {
    const users = await userModel.getAllUsers();
    return users;
  } catch (error) {
    throw error;
  }
};

const registerUser = async ({ Username, PassWord, SDT, ID_role }) => {
  if (!Username || !PassWord || !SDT) {
    throw new Error("Username, password, and SDT are required.");
  }

  if (PassWord.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }
  try {
    const userId = await userModel.addUser({
      Username: Username,
      PassWord: PassWord,
      SDT: SDT,
      ID_role: ID_role || "1", // Default role
    });

    return userId;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  registerUser,
};
