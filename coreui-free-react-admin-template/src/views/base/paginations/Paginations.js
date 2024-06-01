import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';

const Progress = () => {
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Trạng thái để kiểm soát việc ẩn/hiển thị mật khẩu

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <CRow>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cập nhật thông tin nhân viên</strong>
          </CCardHeader>
          <CCardBody>
            <div className="mb-3">
              <label htmlFor="maNhanVien" className="form-label"><strong>Mã nhân viên</strong></label>
              <div>NV012301</div>
            </div>
            <div className="mb-3">
              <label htmlFor="tenNhanVien" className="form-label"><strong>Tên nhân viên</strong></label>
              <div>Trương Việt Hoàng</div>
            </div>
            <div className="mb-3">
              <label htmlFor="ngaySinh" className="form-label"><strong>Ngày sinh</strong></label>
              <div>11/11/2005</div>
            </div>
            <div className="mb-3">
              <label htmlFor="soDienThoai" className="form-label"><strong>Số điện thoại</strong></label>
              <div>0345678901</div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label"><strong>Email</strong></label>
              <div>Hoang@gmail.com</div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="mb-3">
              <label htmlFor="anhNhanVien" className="form-label">Ảnh nhân viên</label>
              <input type="file" className="form-control" id="anhNhanVien" onChange={handleImageChange} />
            </div>
            <div className="mb-3">
              {image && (
                <img src={image} alt="Ảnh nhân viên" style={{ maxWidth: '100%', height: 'auto' }} />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="cccd" className="form-label"><strong>CCCD</strong></label>
              <div>1235676578</div>
            </div>
            <div className="mb-3">
              <label htmlFor="chucVu" className="form-label"><strong>Chức vụ</strong></label>
              <div>Tài xế</div>
            </div>
            <div className="mb-3">
              <label htmlFor="taiKhoan" className="form-label"><strong>Tài khoản</strong></label>
              <div>NVHoang</div>
            </div>
            <div className="mb-3">
              <label htmlFor="matKhau" className="form-label"><strong>Mật khẩu</strong></label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="matKhau"
                  placeholder="Mật khẩu"
                  value={showPassword ? "hoang123" : "*******"} // 
                  readOnly // Đảm bảo ô text không thể chỉnh sửa
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Khi ấn vào button, đảo ngược trạng thái hiện tại của showPassword
                >
                  {showPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
            </div>
           
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Progress;
