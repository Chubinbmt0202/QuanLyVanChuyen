// src/Models/userModel.js
const db = require('../Configs/database');

const getAllUsers = async () => {
    const [rows, fields] = await db.query('SELECT * FROM taikhoan');
    return rows;
};

const addUser = async (user) => {
    const [result] = await db.query('INSERT INTO taikhoan SET ?', user);
    return result.insertId;
};

const findUserByUsername = async (username) => {
    const [rows] = await db.query('SELECT * FROM taikhoan WHERE Username = ?', [username]);
    return rows[0];
  };

const getDriverModel = async () => {
    const [rows, fields] = await db.query('SELECT * FROM taixe WHERE Trang_thai = "Đang rảnh"');
    return rows;
};

module.exports = {
    getAllUsers,
    addUser,
    findUserByUsername,
    getDriverModel,
};
