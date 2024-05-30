const db = require('../Configs/database');

const getAllTraffics = async () => {
    const [rows, fields] = await db.query('SELECT Bien_so, Tinh_Trang, PK_Id_Xe FROM xe');
    return rows;
};

const addTraffics = async (Bien_so, Suc_Chua, Tinh_Trang, Chieu_dai, Ngay_DK, Ngay_Het_DK, Chieu_rong, Chieu_cao, ten_loai_xe, Hang_xe) => {
    const query = `
        INSERT INTO xe (Bien_so, Suc_Chua, Tinh_Trang, Chieu_dai, Ngay_DK, Ngay_Het_DK, Chieu_rong, Chieu_cao, ten_loai_xe, Hang_xe)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [rows, fields] = await db.query(query, [Bien_so, Suc_Chua, Tinh_Trang, Chieu_dai, Ngay_DK, Ngay_Het_DK, Chieu_rong, Chieu_cao, ten_loai_xe, Hang_xe]);
    return rows;
};

const getTrafficById = async (id) => {
    const [results] = await db.query('SELECT * FROM xe WHERE PK_Id_Xe = ?', [id]);
    return results[0];
};

const deleteTrafficById = async (id) => {
    const [results] = await db.query('DELETE FROM xe WHERE PK_Id_Xe = ?', [id]);
    return results;
};

const updateTrafficById = async (id, updatedTrafficData) => {
    const { Bien_so, Suc_Chua, Tinh_Trang, Chieu_dai, Ngay_DK, Ngay_Het_DK, Chieu_rong, Chieu_cao, ten_loai_xe, Hang_xe } = updatedTrafficData;
    const query = `
        UPDATE xe 
        SET Bien_so=?, Suc_Chua=?, Tinh_Trang=?, Chieu_dai=?, Ngay_DK=?, Ngay_Het_DK=?, Chieu_rong=?, Chieu_cao=?, ten_loai_xe=?, Hang_xe=?
        WHERE PK_Id_Xe=?
    `;
    const [rows, fields] = await db.query(query, [Bien_so, Suc_Chua, Tinh_Trang, Chieu_dai, Ngay_DK, Ngay_Het_DK, Chieu_rong, Chieu_cao, ten_loai_xe, Hang_xe, id]);
    return rows;
};

const searchTrafficByLicensePlate = async (licensePlate) => {
    const [rows, fields] = await db.query('SELECT * FROM xe WHERE Bien_so = ?', [licensePlate]);
    return rows;
  };

const getVehicleIdle = async () => {
    const [rows, fields] = await db.query('SELECT * FROM xe WHERE Tinh_Trang = "Đang chờ"');
    return rows;
};


module.exports = {
    getAllTraffics,
    addTraffics,
    getTrafficById,
    deleteTrafficById,
    updateTrafficById,
    searchTrafficByLicensePlate,
    getVehicleIdle,
};
