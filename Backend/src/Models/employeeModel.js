const db = require('../Configs/database');

const getAllDriver = async () => {
    const [rows, fields] = await db.query("Select * from TaiXe");
    return rows;
}
const getAllEmployee = async () => {
    const [rows, fields] = await db.query("select TaiKhoan.PK_Id_TK , Username,PassWord,SDT,Ten_quyen from TaiKhoan join quyen on TaiKhoan.ID_role = quyen.PK_ID_Quyen");
    return rows;
}


const deleteEmployee = async (id) => 
    {
        const [results] =  await db.query("delete from TaiKhoan where Pk_Id_TK = ?",[id]);
        return results[0];
    }



const addDriver = async (Ten_TX,SDT,Email,NgaySinh,GioiTinh,Tinh_Trang,Id_TaiKhoan) =>
    {
        const query  =  `INSERT INTO taixe (Ten_TX,SDT, Email, Ngay_Sinh, Gioi_Tinh, Trang_thai,Id_TaiKhoan) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const[rows,fields] = await db.query(query,[Ten_TX,SDT,Email,NgaySinh,GioiTinh,Tinh_Trang,Id_TaiKhoan]);
        return rows;
    }    

const getInforDriverByID  = async (id) =>
    {
        const query = `select TX.PK_ID_TX ,Ten_TX,TX.SDT,Email,Ngay_Sinh,Gioi_Tinh,Trang_Thai,Username,PassWord from taixe as TX join taikhoan as TK on TX.ID_TaiKhoan  = TK.PK_Id_TK 
        where TX.Pk_Id_TX = ?`;
        const[results] = await db.query(query,[id]);
        return results[0];
        }

module.exports =
{
    getAllDriver,
    getAllEmployee,
    deleteEmployee,
    addDriver,
    getInforDriverByID
}