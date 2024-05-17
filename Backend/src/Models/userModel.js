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

module.exports = {
    getAllUsers,
    addUser
};
