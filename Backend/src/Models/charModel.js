const db = require('../Configs/database');


const getAllDataShipper = async () => {
    const [rows, fields] = await db.query(`SELECT 
        TaiXe.PK_Id_TX,
        TaiXe.Ten_TX as TenTX ,
        TaiXe.SDT,
        TaiXe.Email,
        COUNT(don_hang.PK_ID_DonHang) AS SoLuongDaChay
    FROM 
        TaiXe
    LEFT JOIN 
        don_hang ON TaiXe.PK_Id_TX = don_hang.ID_TX
    GROUP BY 
       TaiXe.PK_Id_TX`);
    return rows;
}

module.exports = {
    getAllDataShipper
}