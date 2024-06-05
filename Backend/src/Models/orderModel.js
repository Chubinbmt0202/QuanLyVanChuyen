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
    const [rows, fields] = await db.query(
      `
      SELECT 
      don_hang.PK_Id_DonHang AS 'Mã đơn hàng',
      don_hang.Ngay_DH AS 'Ngày đặt hàng',
      don_hang.Ngay_GH AS 'Ngày giao',
      dich_vu_van_chuyen.Ten_dich_vu AS 'Tên dịch vụ vận chuyển',
      dich_vu_van_chuyen.Gia_dich_vu AS 'Giá dịch vụ vận chuyển',
      khachhang.Ten_KH AS 'Tên khách hàng',
      khachhang.SDT AS 'Số điện thoại khách hàng',
      CONCAT(diachi.Ten_Dia_Chi, ', ', diachi.Xa, ', ', diachi.Quan_huyen, ', ', diachi.Tinh) AS 'Địa chỉ khách hàng',
      GROUP_CONCAT(
          DISTINCT CONCAT(
              sanpham.Ten_San_Pham, ' - ', 
              sanpham.Mo_Ta, ' - Giá: ', 
              sanpham.Gia, ' - Số lượng: ', 
              chi_tiet_don_hang.So_Luong
          ) SEPARATOR ', '
      ) AS 'Các sản phẩm mà khách hàng đặt',
      taixe.Ten_TX AS 'Tài xế phụ trách',
      taixe.SDT AS 'Số điện thoại tài xế',
      SUM(chi_tiet_don_hang.So_Luong) AS 'Tổng số lượng mặt hàng',
      SUM(chi_tiet_don_hang.Chieu_dai * chi_tiet_don_hang.Chieu_rong * chi_tiet_don_hang.Chieu_cao * chi_tiet_don_hang.So_Luong) AS 'Tổng khối lượng'
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
      dich_vu_van_chuyen.Gia_dich_vu,
      khachhang.Ten_KH, 
      khachhang.SDT, 
      diachi.Ten_Dia_Chi, 
      diachi.Xa, 
      diachi.Quan_huyen, 
      diachi.Tinh, 
      taixe.Ten_TX, 
      taixe.SDT
  LIMIT 0, 1000;
  
        `,
      [id]
    );

    return rows;
  } catch (error) {
    console.error("Error in getDetailOrderByID: ", error);
    throw error; // Rethrow the error for handling in upper layers
  }
};

const getOrderDetailFinished = async (id) => {
  try {
    const [rows, fields] = await db.query(
      `
      SELECT 
    don_hang.PK_Id_DonHang AS 'Mã đơn hàng',
    don_hang.Ngay_DH AS 'Ngày đặt hàng',
    don_hang.Ngay_GH AS 'Ngày giao',
    dich_vu_van_chuyen.Ten_dich_vu AS 'Tên dịch vụ vận chuyển',
    dich_vu_van_chuyen.Gia_dich_vu AS 'Giá dịch vụ vận chuyển',
    khachhang.Ten_KH AS 'Tên khách hàng',
    khachhang.SDT AS 'Số điện thoại khách hàng',
    CONCAT(diachi.Ten_Dia_Chi, ', ', diachi.Xa, ', ', diachi.Quan_huyen, ', ', diachi.Tinh) AS 'Địa chỉ khách hàng',
    GROUP_CONCAT(
        DISTINCT CONCAT(
            sanpham.Ten_San_Pham, ' - ', 
            sanpham.Mo_Ta, ' - Giá: ', 
            sanpham.Gia, ' - Số lượng: ', 
            chi_tiet_don_hang.So_Luong
        ) SEPARATOR ', '
    ) AS 'Các sản phẩm mà khách hàng đặt',
    taixe.Ten_TX AS 'Tài xế phụ trách',
    taixe.SDT AS 'Số điện thoại tài xế',
    xe.Bien_so,
    SUM(chi_tiet_don_hang.So_Luong) AS 'Tổng số lượng mặt hàng',
    SUM(chi_tiet_don_hang.Chieu_dai * chi_tiet_don_hang.Chieu_rong * chi_tiet_don_hang.Chieu_cao * chi_tiet_don_hang.So_Luong) AS 'Tổng khối lượng'
FROM 
    don_hang
    JOIN dich_vu_van_chuyen ON don_hang.ID_DichVu = dich_vu_van_chuyen.PK_Id_DichVu
    JOIN khachhang ON don_hang.ID_KH = khachhang.PK_Ma_KH
    JOIN diachi ON diachi.reference_id = khachhang.PK_Ma_KH AND diachi.type = 'customer'
    JOIN chi_tiet_don_hang ON don_hang.PK_Id_DonHang = chi_tiet_don_hang.PK_Id_DonHang
    JOIN sanpham ON chi_tiet_don_hang.PK_Id_SanPham = sanpham.PK_Id_SanPham
    JOIN taixe ON don_hang.ID_TX = taixe.PK_Id_TX
    JOIN xe ON don_hang.FK_Id_Xe = xe.PK_Id_Xe
WHERE 
    don_hang.PK_Id_DonHang = ?
GROUP BY 
    don_hang.PK_Id_DonHang, 
    don_hang.Ngay_DH, 
    don_hang.Ngay_GH, 
    dich_vu_van_chuyen.Ten_dich_vu, 
    dich_vu_van_chuyen.Gia_dich_vu,
    khachhang.Ten_KH, 
    khachhang.SDT, 
    diachi.Ten_Dia_Chi, 
    diachi.Xa, 
    diachi.Quan_huyen, 
    diachi.Tinh, 
    taixe.Ten_TX, 
    taixe.SDT,
    xe.Bien_so
LIMIT 0, 1000;
  
        `,
      [id]
    );

    return rows;
  } catch (error) {
    console.error("Error in getDetailOrderByID: ", error);
    throw error; // Rethrow the error for handling in upper layers
  }
};

// Order Model
const updateOrderDeliveryDate = async (PK_Id_DonHang, Ngay_DH) => {
  const query = "UPDATE don_hang SET Ngay_DH = ? WHERE PK_Id_DonHang = ?";
  await db.query(query, [Ngay_DH, PK_Id_DonHang]);
};

// Driver Model
const updateDriverStatus = async (Trang_thai, PK_Id_TX) => {
  const query = "UPDATE taixe SET Trang_thai = 'Đang bận' WHERE PK_Id_TX = ?";
  await db.query(query, [Trang_thai, PK_Id_TX]);
};

// Vehicle Model
const updateVehicleStatus = async (Tinh_Trang, PK_Id_Xe) => {
  const query = "UPDATE xe SET Tinh_Trang = 'Đang giao' WHERE PK_Id_Xe = ?";
  await db.query(query, [Tinh_Trang, PK_Id_Xe]);
};

// add vehicle id
const addVehicleId = async (PK_Id_Xe, PK_Id_DonHang) => {
  const query = "UPDATE don_hang SET FK_Id_Xe = ? WHERE PK_Id_DonHang = ?";
  await db.query(query, [PK_Id_Xe, PK_Id_DonHang]);
}

const updateOrderAddress = async (addressCustomer, orderId) => {
  try {
    const query = "UPDATE don_hang SET tuyen_duong = ? WHERE PK_Id_DonHang = ?";
    await db.query(query, [addressCustomer, orderId]);
  } catch (error) {
    throw error;
  }
};

const updateOrder = async (orderId) => {
  try {
    const query = "UPDATE don_hang SET Trang_Thai = 2 WHERE PK_Id_DonHang = ?";
    await db.query(query, [orderId]);
  } catch (error) {
    throw error;
  }
};

const updateOrderDateDevivery = async (deliveryDate, orderId) => {
  try {
    const query = "UPDATE don_hang SET Ngay_GH = ? WHERE PK_Id_DonHang = ?";
    await db.query(query, [deliveryDate, orderId]);
  } catch (error) {
    throw error;
  }
};
const getOrderByIdKH = async (id) => {
  try {
    const query = `SELECT Ten_Don_Hang,
    CASE 
        WHEN dh.Trang_Thai = 0 THEN 'Chưa giao hàng'
        WHEN dh.Trang_Thai = 1 THEN 'Đã giao hàng'
        WHEN dh.Trang_Thai = 2 THEN 'Đang giao hàng'
        ELSE 'Trạng thái không xác định'
    END AS TrangThai, 
    ID_KH  
FROM don_hang dh 
WHERE ID_KH = ?`;

    const [rows, fields] = await db.query(query, [id]);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllOrders,
  getDetailOrderByID,
  updateOrderDeliveryDate,
  updateDriverStatus,
  updateVehicleStatus,
  updateOrder,
  updateOrderDateDevivery,
  updateOrderAddress,
  getOrderByIdKH,
  getOrderDetailFinished,
  addVehicleId,
};
