const db = require('../Configs/database');

const LoginDriver = async (SDT, PassWord, ID_role) => {
    const [rows] = await db.query('SELECT SDT, PassWord FROM taikhoan WHERE SDT = ? AND PassWord = ? AND ID_role = ?', [SDT, PassWord, ID_role]);
    return rows[0];
}

const getDetailDriver = async (SDT) => {
    const [rows] = await db.query(`
        SELECT 
            taixe.Ten_TX, 
            taikhoan.Username, 
            taikhoan.PassWord, 
            taikhoan.SDT,
            taixe.PK_Id_TX
        FROM 
            taikhoan
        JOIN 
            taixe 
        ON 
            taikhoan.PK_Id_TK = taixe.Id_TaiKhoan
        WHERE 
            taikhoan.SDT = ?
    `, [SDT]);
    return rows[0];
}

module.exports = {
    LoginDriver,
    getDetailDriver
};
