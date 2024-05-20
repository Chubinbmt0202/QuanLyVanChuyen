const db = require('../Configs/database');

const getAllTraffics = async () => {
    const [rows, fields] = await db.query('SELECT Bien_so, Tinh_Trang FROM xe');
    return rows;
};

const addTraffics = async (Bien_so, Suc_Chua, Tinh_Trang, Chieu_dai, Ngay_DK, Ngay_Het_DK, Chieu_rong, Chieu_cao, ten_loai_xe, Hang_xe) => {
    const query = `
        INSERT INTO xe ( Bien_so, Suc_Chua, Tinh_Trang, Chieu_dai, Ngay_DK, Ngay_Het_DK, Chieu_rong, Chieu_cao, ten_loai_xe, Hang_xe)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [rows, fields] = await db.query(query, [Bien_so, Suc_Chua, Tinh_Trang, Chieu_dai, Ngay_DK, Ngay_Het_DK, Chieu_rong, Chieu_cao, ten_loai_xe, Hang_xe]);
    return rows;
};


module.exports = {
    getAllTraffics,
    addTraffics,
};
