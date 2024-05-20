/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
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
} from '@coreui/react'
import { DocsExample } from 'src/components'
import ReactImg from 'src/assets/images/react.jpg'
import axios from 'axios'

const Cards = () => {
  const [currentStatus, setCurrentStatus] = useState('Tất cả')
  const [visibleAddVehicle, setVisibleAddVehicle] = useState(false)
  const [formData, setFormData] = useState({
    Bien_so: '',
    Hang_xe: '',
    ten_loai_xe: '',
    Suc_Chua: '',
    Tinh_Trang: 'Đang chờ',
    Chieu_dai: '',
    Chieu_rong: '',
    Chieu_cao: '',
    Ngay_DK: '',
    Ngay_Het_DK: '',
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3001/api/addTraffics', formData)
      onClose()
    } catch (error) {
      console.error('Error adding vehicle:', error)
    }
  }
  const data = [
    {
      id: 1,
      plate: '43R1 - 67482',
      route: 'Đà Nẵng - Hà Nội',
      distance: '567 KM',
      estimatedTime: '1 ngày 17 giờ',
      status: 'Đang giao',
      completionDate: '13/01/2024',
    },
    {
      id: 2,
      plate: '43R1 - 67482',
      route: '',
      distance: '',
      estimatedTime: '',
      status: 'Bảo trì',
      completionDate: '',
    },
    {
      id: 3,
      plate: '43R1 - 67482',
      route: '',
      distance: '',
      estimatedTime: '',
      status: 'Đang chờ',
      completionDate: '',
    },
  ]

  const filteredData =
    currentStatus === 'Tất cả' ? data : data.filter((item) => item.status === currentStatus)

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
          <strong>Danh sách phương tiện</strong>
        </CCardHeader>
        <CButton color="primary" onClick={() => setVisibleAddVehicle(true)}>
          Thêm phương tiện
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
                  active={currentStatus === 'Đang chờ'}
                  onClick={() => setCurrentStatus('Đang chờ')}
                >
                  Đang chờ
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Bảo trì'}
                  onClick={() => setCurrentStatus('Bảo trì')}
                >
                  Bảo trì
                </CNavLink>
              </CNavItem>
            </CNav>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Biển số</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tuyến đường</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Khoảng cách</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Thời gian dự kiến</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Dự kiến hoàn thành</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tuỳ chọn</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((item, index) => (
                    <CTableRow key={item.id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{item.plate}</CTableDataCell>
                      <CTableDataCell>{item.route}</CTableDataCell>
                      <CTableDataCell>{item.distance}</CTableDataCell>
                      <CTableDataCell>{item.estimatedTime}</CTableDataCell>
                      <CTableDataCell
                        style={{
                          color:
                            item.status === 'Đang giao'
                              ? 'green'
                              : item.status === 'Bảo trì'
                                ? 'red'
                                : 'gray',
                        }}
                      >
                        {item.status}
                      </CTableDataCell>
                      <CTableDataCell>{item.completionDate}</CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary">Tuỳ chỉnh</CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem>Xem chi tiết</CDropdownItem>
                            <CDropdownItem>Chỉnh sửa</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>Xoá phương tiện</CDropdownItem>
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
          <CModalTitle id="AddVehicleModal">Thêm phương tiện</CModalTitle>
        </CModalHeader>
        <CForm
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1rem',
          }}
        >
          <CFormInput
            type="text"
            style={{ flex: '1 1 45%' }}
            id="Bien_so"
            onChange={handleChange}
            placeholder="Biển số xe"
            aria-describedby="exampleFormControlInputHelpInline"
          />
          <CFormSelect
            style={{ flex: '1 1 45%' }}
            id="ten_loai_xe"
            onChange={handleChange}
            aria-label="Default select example"
            options={[
              'Chọn loại phương tiện',
              { label: 'Xe tải lớn', value: 'Xe tải lớn' },
              { label: 'Xe tải nhỏ', value: 'Xe tải nhỏ' },
              { label: 'Xe rơ móoc', value: 'Xe rơ móoc', disabled: true },
            ]}
          />
          <CFormSelect
            style={{ flex: '1 1 45%' }}
            id="Hang_xe"
            onChange={handleChange}
            aria-label="Default select example"
            options={[
              'Chọn hãng xe',
              { label: 'Huyndai', value: 'Huyndai' },
              { label: 'Suzuki', value: 'Suzuki' },
              { label: 'Daewoo', value: 'Daewoo' },
            ]}
          />
          <CFormInput
            type="number"
            style={{ flex: '1 1 45%' }}
            id="Suc_Chua"
            onChange={handleChange}
            placeholder="Tổng tải trọng (kg/tấn)"
          />
          <p style={{ flex: '1 1 100%', margin: '0' }}>Kích thước xe</p>
          <div style={{ display: 'flex', flex: '1 1 100%', gap: '1rem' }}>
            <CFormInput
              type="number"
              style={{ flex: '1 1 30%' }}
              id="Chieu_dai"
              onChange={handleChange}
              placeholder="Chiều dài (m)"
            />
            <CFormInput
              type="number"
              style={{ flex: '1 1 30%' }}
              id="Chieu_rong"
              onChange={handleChange}
              placeholder="Chiều rộng (m)"
            />
            <CFormInput
              type="number"
              style={{ flex: '1 1 30%' }}
              id="Chieu_cao"
              onChange={handleChange}
              placeholder="Chiều cao (m)"
            />
          </div>
          <CFormInput
            type="date"
            style={{ flex: '1 1 45%' }}
            id="Ngay_DK"
            placeholder="Ngày đăng ký"
            onChange={handleChange}
          />
          <CFormInput
            type="date"
            style={{ flex: '1 1 45%' }}
            id="Ngay_Het_DK"
            placeholder="Ngày hết hạn đăng ký"
            onChange={handleChange}
          />
          {/* <CFormInput
              type="file"
              style={{ flex: '1 1 45%' }}
              id="vehicleImage"
              label="Ảnh chụp tổng quát"
              accept="image/*"
            /> */}
        </CForm>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleAddVehicle(false)}>
            Đóng
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>
            Lưu
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Cards
