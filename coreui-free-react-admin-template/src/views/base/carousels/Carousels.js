import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTableCaption,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from '@coreui/react';
import ReactImg from 'src/assets/images/react.jpg';

const Carousels = () => {
  const [currentStatus, setCurrentStatus] = useState('Tất cả');
  const [selectedItems, setSelectedItems] = useState([]);

  const data = [
    {
      id: 1,
      IDNV: 'Nv102312',
      dayofbirth: '1/1/2003',
      account: 'something',
      position: 'Tài xế',
      status: 'Đang giao',
      Viewmore: 'Xem thêm',
    },
    {
      id: 2,
      IDNV: 'Nv102312',
      dayofbirth: '1/1/2003',
      account: 'something',
      position: 'Tài xế',
      status: 'Đang giao',
      Viewmore: 'Xem thêm',
    },
    {
      id: 3,
      IDNV: 'Nv102312',
      dayofbirth: '1/1/2003',
      account: 'something',
      position: 'Tài xế',
      status: 'Đang giao',
      Viewmore: 'Xem thêm',
    },
    {
      id: 4,
      IDNV: 'Nv102312',
      dayofbirth: '1/1/2003',
      account: 'something',
      position: 'Tài xế',
      status: 'Đang giao',
      Viewmore: 'Xem thêm',
    },
    {
      id: 5,
      IDNV: 'Nv102312',
      dayofbirth: '1/1/2003',
      account: 'something',
      position: 'Tài xế',
      status: 'Đã nghỉ',
      Viewmore: 'Xem thêm',
    },
   
  ];

  const filteredData =
    currentStatus === 'Tất cả' ? data : data.filter((item) => item.status === currentStatus);

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map((item) => item.id));
    }
  };

  const toggleSelectedItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const isSelected = (id) => {
    return selectedItems.includes(id);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <CCardHeader style={{ marginBottom: '10px' }}>
          <strong>Tài khoản và phân cấp</strong>
          <div>
            <span style={{ marginRight: '200px', fontSize: 'larger' }}>
              Tổng số nhân viên: <span style={{ color: 'blue', fontSize: 'x-large' }}>560</span>
            </span>
            <span style={{ fontSize: 'larger' }}>
              Nhân viên đang làm việc: <span style={{ color: 'green', fontSize: 'x-large' }}>300</span>
            </span>
          </div>
        </CCardHeader>
        {/* Giữ nguyên nút thêm tài khoản */}
        <CButton color="primary">
          <Link to="/base/Spinners" style={{ color: 'white', textDecoration: 'none' }}>+ Thêm tài khoản</Link>
        </CButton>
      </div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CNav variant="underline-border">
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Tất cả'}
                  onClick={() => setCurrentStatus('Tất cả')}
                >
                  Tất cả
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Đang giao'}
                  onClick={() => setCurrentStatus('Đang giao')}
                >
                  Đang giao
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Đang rảnh'}
                  onClick={() => setCurrentStatus('Đang rảnh')}
                >
                  Đang rảnh
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Đã Nghỉ'}
                  onClick={() => setCurrentStatus('Đã Nghỉ')}
                >
                  Đã nghỉ
                </CNavLink>
              </CNavItem>
            </CNav>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === filteredData.length}
                        onChange={toggleSelectAll}
                      />
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Mã nhân viên</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngày sinh</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tài khoản</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Chức vụ</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                    {/* Xem chi tiết chuyển đến /base/progress */}
                    <CTableHeaderCell scope="col">Tuỳ chọn</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((item, index) => (
                    <CTableRow key={item.id}>
                      <CTableHeaderCell scope="row">
                        <input
                          type="checkbox"
                          checked={isSelected(item.id)}
                          onChange={() => toggleSelectedItem(item.id)}
                        />
                      </CTableHeaderCell>
                      <CTableDataCell>
                        <span style={{ color: 'blue' }}>{item.IDNV}</span>
                      </CTableDataCell>
                      <CTableDataCell>{item.dayofbirth}</CTableDataCell>
                      <CTableDataCell>{item.account}</CTableDataCell>
                      <CTableDataCell style={{ color: 'blue' }}>{item.position}</CTableDataCell>

                      <CTableDataCell
                        style={{
                          color:
                            item.status === 'Đang giao'
                              ? 'green'
                              : item.status === 'Đã nghỉ'
                              ? 'red'
                              : 'gray',
                        }}
                      >
                        {item.status}
                      </CTableDataCell>

                      {/* Tuỳ chọn */}
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary">Tuỳ chọn</CDropdownToggle>
                          <CDropdownMenu>
                            {/* Xem chi tiết chuyển đến /base/progress */}
                            <CDropdownItem><Link to="/base/Paginations">Xem chi tiết</Link></CDropdownItem>
                            {/* Chỉnh sửa chuyển đến /base/progress */}
                            <CDropdownItem><Link to="/base/progress">Chỉnh sửa</Link></CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem></CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Carousels;
