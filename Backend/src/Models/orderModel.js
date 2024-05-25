const db = require("../Configs/database");

const getAllOrders = async () => {
  const [rows, fields] = await db.query(`
        SELECT
            dh.PK_Id_DonHang AS 'MaDH',
            kh.Ten_KH AS 'TenKH',
            dh.Ngay_DH AS 'NgayDatHang',
            CASE 
                WHEN dh.Trang_Thai = 0 THEN NULL
                ELSE dh.Ngay_GH
            END AS 'NgayGiaoHang',
            CASE 
                WHEN dh.Trang_Thai = 0 THEN 'Chưa giao hàng'
                WHEN dh.Trang_Thai = 1 THEN 'Đã giao hàng'
                WHEN dh.Trang_Thai = 2 THEN 'Đang giao hàng'
                ELSE 'Trạng thái không xác định'
            END AS 'TrangThai',
            SUM(ctdh.KhoiLuongQuyDoi) AS 'KhoiLuong',
            SUM(ctdh.Gia_Tri_Hang_Hoa) AS 'TongTien'
        FROM
            don_hang dh
        JOIN
            khachhang kh ON dh.ID_KH = kh.PK_Ma_KH
        JOIN
            chi_tiet_don_hang ctdh ON dh.PK_Id_DonHang = ctdh.PK_Id_DonHang
        GROUP BY
            dh.PK_Id_DonHang, kh.Ten_KH, dh.Ngay_DH, dh.Trang_Thai
    `);
  return rows;
};

const getDetailOrderByID = async (id) => {
    try {
        const [rows, fields] = await db.query(`
            SELECT 
                don_hang.PK_Id_DonHang AS 'Mã đơn hàng',
                don_hang.Ngay_DH AS 'Ngày đặt hàng',
                don_hang.Ngay_GH AS 'Ngày giao',
                dich_vu_van_chuyen.Ten_dich_vu AS 'Tên dịch vụ vận chuyển',
                khachhang.Ten_KH AS 'Tên khách hàng',
                khachhang.SDT AS 'Số điện thoại khách hàng',
                diachi.Ten_Dia_Chi AS 'Địa chỉ khách hàng',
                GROUP_CONCAT(
                    DISTINCT CONCAT(
                        sanpham.Ten_San_Pham, ' - ', 
                        sanpham.Mo_Ta, ' - Giá: ', 
                        sanpham.Gia
                    ) SEPARATOR ', '
                ) AS 'Các sản phẩm mà khách hàng đặt',
                taixe.Ten_TX AS 'Tài xế phụ trách',
                taixe.SDT AS 'Số điện thoại tài xế'
            FROM 
                don_hang
                JOIN dich_vu_van_chuyen ON don_hang.ID_DichVu = dich_vu_van_chuyen.PK_Id_DichVu
                JOIN khachhang ON don_hang.ID_KH = khachhang.PK_Ma_KH
                JOIN diachi ON diachi.reference_id = khachhang.PK_Ma_KH AND diachi.type = 'customer'
                JOIN chi_tiet_don_hang ON don_hang.PK_Id_DonHang = chi_tiet_don_hang.PK_Id_DonHang
                JOIN sanpham ON chi_tiet_don_hang.PK_Id_SanPham = sanpham.PK_Id_SanPham
                JOIN taixe ON don_hang.ID_TX = taixe.PK_Id_TX
            WHERE 
                don_hang.PK_Id_DonHang = ?
            GROUP BY 
                don_hang.PK_Id_DonHang, 
                don_hang.Ngay_DH, 
                don_hang.Ngay_GH, 
                dich_vu_van_chuyen.Ten_dich_vu, 
                khachhang.Ten_KH, 
                khachhang.SDT, 
                diachi.Ten_Dia_Chi, 
                taixe.Ten_TX, 
                taixe.SDT 
            LIMIT 0, 1000;
        `, [id]);
        
        return rows;
    } catch (error) {
        console.error("Error in getDetailOrderByID: ", error);
        throw error; // Rethrow the error for handling in upper layers
    }
};



module.exports = {
  getAllOrders,
  getDetailOrderByID, 
};
