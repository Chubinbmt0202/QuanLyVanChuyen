import React, { useState } from 'react';

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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
} from '@coreui/react';
import { DocsExample } from 'src/components';
import ReactImg from 'src/assets/images/react.jpg';

const Cards = () => {
  const [currentStatus, setCurrentStatus] = useState('Tất cả');
  const [visibleAddVehicle, setVisibleAddVehicle] = useState(false);
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
      status: 'Đã nghỉ',
      Viewmore: 'Xem thêm',
    },
    {
      id: 3,
      IDNV: 'Nv102312',
      dayofbirth: '1/1/2003',
      account: 'something',
      position: 'Tài xế',
      status: 'Đang rảnh',
      Viewmore:  'Xem thêm',
    },
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
      id: 1,
      IDNV: 'Nv102312',
      dayofbirth: '1/1/2003',
      account: 'something',
      position: 'Tài xế',
      status: 'Đang giao',
      Viewmore: 'Xem thêm',
    },{
      id: 2,
      IDNV: 'Nv102312',
      dayofbirth: '1/1/2003',
      account: 'something',
      position: 'Tài xế',
      status: 'Đã nghỉ',
      Viewmore: 'Xem thêm',
    },
    {
      id: 1,
      IDNV: 'Nv102312',
      dayofbirth: '1/1/2003',
      account: 'something',
      position: 'Tài xế',
      status: 'Đang giao',
      Viewmore: 'Xem thêm',
    },{
      id: 1,
      IDNV: 'Nv102312',
      dayofbirth: '1/1/2003',
      account: 'something',
      position: 'Tài xế',
      status: 'Đang giao',
      Viewmore: 'Xem thêm',
    },{
      id: 1,
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
      status: 'Đang rảnh',
      Viewmore:  'Xem thêm',
    },
    {
      id: 3,
      IDNV: 'Nv102312',
      dayofbirth: '1/1/2003',
      account: 'something',
      position: 'Tài xế',
      status: 'Đang rảnh',
      Viewmore:  'Xem thêm',
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
          <span style={{ marginRight: '200px', fontSize: 'larger' }}>Tổng số nhân viên: <span style={{ color: 'blue', fontSize: 'x-large' }}>560</span></span>
<span style={{ fontSize: 'larger',  }}>Nhân viên đang làm việc: <span style={{ color: 'green', fontSize: 'x-large' }}>300</span></span>


          </div>
        </CCardHeader>
        <CButton color="primary" onClick={() => setVisibleAddVehicle(true)}>
          +Thêm tài khoản
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
                    <CTableHeaderCell scope="col">Xem chi tiết</CTableHeaderCell>
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
                      <span style={{ color: 'blue' }}>{item.IDNV}</span></CTableDataCell>
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
                      <CTableDataCell style={{ color: 'blue' }}>{item.Viewmore}</CTableDataCell>

                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary">Tuỳ chọn</CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem>Xem chi tiết</CDropdownItem>
                            <CDropdownItem>Chỉnh sửa</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>Xoá tài xe</CDropdownItem>
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

      <CModal
        size="lg"
        visible={visibleAddVehicle}
        onClose={() => setVisibleAddVehicle(false)}
        aria-labelledby="AddVehicleModal"
      >
        <CModalHeader>
  <CModalTitle id="AddVehicleModal">+ Thêm tài khoản</CModalTitle>
</CModalHeader>
<CForm style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
  <div style={{ width: '45%' }}>
    <CFormInput
      type="text"
      id="employeeId"
      placeholder="Mã nhân viên"
      aria-describedby="employeeIdHelpInline"
    />
    <CFormInput
      type="text"
      id="employeeName"
      placeholder="Tên nhân viên"
      aria-describedby="employeeNameHelpInline"
      style={{ marginTop: '10px' }}
    />
    <CFormInput
      type="text"
      id="dateOfBirth"
      placeholder="Ngày sinh"
      aria-describedby="dateOfBirthHelpInline"
      style={{ marginTop: '10px' }}
    />
    <CFormInput
      type="text"
      id="phoneNumber"
      placeholder="Số điện thoại"
      aria-describedby="phoneNumberHelpInline"
      style={{ marginTop: '10px' }}
    />
    <CFormInput
      type="text"
      id="email"
      placeholder="Email"
      aria-describedby="emailHelpInline"
      style={{ marginTop: '10px' }}
    />
  </div>
  <div style={{ width: '45%', borderLeft: '1px solid #ccc', paddingLeft: '20px' }}>
  <CFormInput
  type="file"
  id="avatar"
  placeholder="Av"
  aria-describedby="avatarHelpInline"
  onChange={(e) => handleFileChange(e)}
/>


    <CFormInput
      type="text"
      id="cccd"
      placeholder="CCCD"
      aria-describedby="cccdHelpInline"
      style={{ marginTop: '10px' }}
    />
    <CFormInput
      type="text"
      id="position"
      placeholder="Chức vụ"
      aria-describedby="positionHelpInline"
      style={{ marginTop: '10px' }}
    />
    <CFormInput
      type="text"
      id="account"
      placeholder="Tài khoản"
      aria-describedby="accountHelpInline"
      style={{ marginTop: '10px' }}
    />
    <CFormInput
      type="password"
      id="password"
      placeholder="Mật khẩu"
      aria-describedby="passwordHelpInline"
      style={{ marginTop: '10px' }}
    />
  </div>
</CForm>
<CModalFooter>
  <CButton color="secondary" onClick={() => setVisibleAddVehicle(false)}>
    Đóng
  </CButton>
  <CButton color="primary">Lưu</CButton>
</CModalFooter>

      </CModal>
    </>
  );
};

export default Cards;
