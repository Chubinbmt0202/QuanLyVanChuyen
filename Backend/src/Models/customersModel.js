const db = require('../Configs/database');


const getAllCustomers = async () => {
    const [rows, fields] = await db.query('SELECT PK_Ma_KH,Ten_KH,Email,SDT From khachhang ');
    return rows;
}

const searchCustomerByName = async (nameCus) => {
    const [rows, fields] = await db.query('SELECT Ten_KH,Email,SDT,ID_Dia_Chi From KhachHang  Where Ten_KH LIKE ? ', nameCus);
    return rows;
}



module.exports = {
    getAllCustomers,
    searchCustomerByName
};