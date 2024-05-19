import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'







const Tables = () => {

  // const [orders, setOrders] = useState([
  //   {
  //     id: 1,
  //     companyName: 'Công ty Lai Châu',
  //     phoneNumber: '045896521472',
  //     joinDate: '2024-04-05 08:29',
  //     orderValue: 1235235000,
  //     address: '123 Nguyễn Lương Bàng, Mộc Châu, Lai Châu',
  //   },
  //   {
  //     id: 2,
  //     companyName: 'Vật liệu xây dựng Nguyễn Hoàng',
  //     phoneNumber: '045896521472',
  //     joinDate: '2024-04-05 08:29',
  //     orderValue: 1235235000,
  //     address: '21 Lê Đuân, Bình Thạnh, Thành phố Hồ Chí Minh',
  //   },
  //   {
  //     id: 3,
  //     companyName: 'Công ty Daiwa',
  //     phoneNumber: '045896521472',
  //     joinDate: '2024-04-05 08:29',
  //     orderValue: 1235235000,
  //     address: '234 Ngô Tất Tố, Phố Hàng Bưởi, Hà Nội',
  //   },
  //   {
  //     id: 4,
  //     companyName: 'Công ty Hoà Xuân',
  //     phoneNumber: '045896521472',
  //     joinDate: '2024-04-05 00:29',
  //     orderValue: 1235235000,
  //     address: 'Số 234, Điện Bàn, Quảng Nam',
  //   },
  // ]);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(5);

  // const start = (currentPage - 1) * pageSize;
  // const end = start + pageSize;
  // const paginatedOrders = orders.slice(start, end);

  // const handlePageChange = (newPage) => {
  //   setCurrentPage(newPage);
  // };

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleDropdownToggle = (orderId) => {
    console.log("Action click")
    setShowDropdown(!showDropdown);
    setSelectedOrderId(orderId);
  };

  const handleDropdownOptionClick = (option) => {
    if (option === 'Chỉnh sửa') {
      // Chỉnh sửa đơn hàng
      console.log('Chỉnh sửa đơn hàng', selectedOrderId);
    } else if (option === 'Xóa') {
      // Xóa đơn hàng
      console.log('Xóa đơn hàng', selectedOrderId);
    }
    setShowDropdown(false);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh Sách Khách Hàng</strong>

          </CCardHeader>
          <CCardBody>
            <CTable color="dark" striped>

              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Tên Công Ty</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Số Điện Thoại</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ngày Tham Gia</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Giá Trị Đơn Hàng</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>Công ty Lai Châu</CTableDataCell>
                  <CTableDataCell>045896521472</CTableDataCell>
                  <CTableDataCell>2024-04-05 08:29</CTableDataCell>
                  <CTableDataCell>1235235000</CTableDataCell>
                  <CTableDataCell><a href='#'>Xem chi tiết</a></CTableDataCell>
                  <CTableDataCell>
                    {/* // truyền vào id giá trị của dòng đó */}
                    <button onClick={() => handleDropdownToggle(2)}>Tùy chọn</button>
                    {showDropdown && selectedOrderId === 2 && (
                      <div className="dropdown" >
                        <ul>
                          <li onClick={() => handleDropdownOptionClick('Chỉnh sửa')}>Chỉnh sửa</li>
                          <li onClick={() => handleDropdownOptionClick('Xóa')}>Xóa</li>
                        </ul>
                      </div>
                    )}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Công ty Lai Châu</CTableDataCell>
                  <CTableDataCell>045896521472</CTableDataCell>
                  <CTableDataCell>2024-04-05 08:29</CTableDataCell>
                  <CTableDataCell>1235235000</CTableDataCell>
                  <CTableDataCell><a href='#'>Xem chi tiết</a></CTableDataCell>
                  <CTableDataCell>
                    <button onClick={() => handleDropdownToggle(2)}>Tùy chọn</button>
                    {showDropdown && selectedOrderId === 2 && (
                      <div className="dropdown" >
                        <ul>
                          <li onClick={() => handleDropdownOptionClick('Chỉnh sửa')} >Chỉnh sửa</li>
                          <li onClick={() => handleDropdownOptionClick('Xóa')}>Xóa</li>
                        </ul>
                      </div>
                    )}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Công ty Lai Châu</CTableDataCell>
                  <CTableDataCell>045896521472</CTableDataCell>
                  <CTableDataCell>2024-04-05 08:29</CTableDataCell>
                  <CTableDataCell>1235235000</CTableDataCell>
                  <CTableDataCell><a href='#'>Xem chi tiết</a></CTableDataCell>
                  <CTableDataCell>
                    <button onClick={() => handleDropdownToggle(2)}>Tùy chọn</button>
                    {showDropdown && selectedOrderId === 2 && (
                      <div className="dropdown" >
                        <ul>
                          <li onClick={() => handleDropdownOptionClick('Chỉnh sửa')}>Chỉnh sửa</li>
                          <li onClick={() => handleDropdownOptionClick('Xóa')}>Xóa</li>
                        </ul>
                      </div>
                    )}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Công ty Lai Châu</CTableDataCell>
                  <CTableDataCell>045896521472</CTableDataCell>
                  <CTableDataCell>2024-04-05 08:29</CTableDataCell>
                  <CTableDataCell>1235235000</CTableDataCell>
                  <CTableDataCell><a href='#'>Xem chi tiết</a></CTableDataCell>
                  <CTableDataCell>
                    <button onClick={() => handleDropdownToggle(2)}>Tùy chọn</button>
                    {showDropdown && selectedOrderId === 2 && (
                      <div className="dropdown" >
                        <ul>
                          <li onClick={() => handleDropdownOptionClick('Chỉnh sửa')}>Chỉnh sửa</li>
                          <li onClick={() => handleDropdownOptionClick('Xóa')}>Xóa</li>
                        </ul>
                      </div>
                    )}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Công ty Lai Châu</CTableDataCell>
                  <CTableDataCell>045896521472</CTableDataCell>
                  <CTableDataCell>2024-04-05 08:29</CTableDataCell>
                  <CTableDataCell>1235235000</CTableDataCell>
                  <CTableDataCell><a href='#'>Xem chi tiết</a></CTableDataCell>
                  <CTableDataCell>
                    <button onClick={() => handleDropdownToggle(2)}>Tùy chọn</button>
                    {showDropdown && selectedOrderId === 2 && (
                      <div className="dropdown" >
                        <ul>
                          <li onClick={() => handleDropdownOptionClick('Chỉnh sửa')}>Chỉnh sửa</li>
                          <li onClick={() => handleDropdownOptionClick('Xóa')}>Xóa</li>
                        </ul>
                      </div>
                    )}
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

  )
}

export default Tables
