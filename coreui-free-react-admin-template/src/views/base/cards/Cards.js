/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CModalBody,
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


  const dataFake = {
    "PK_Id_Xe": 1,
    "ID_LoaiXe": null,
    "Bien_so": "47AB - 82421",
    "Suc_Chua": 213,
    "Tinh_Trang": "Đang chờ",
    "Chieu_dai": 1412,
    "Ngay_DK": "2024-05-01T17:00:00.000Z",
    "Ngay_Het_DK": "2024-05-15T17:00:00.000Z",
    "Chieu_rong": 231,
    "Chieu_cao": 231,
    "ten_loai_xe": "Xe tải lớn",
    "Hang_xe": "Suzuki"
}

  const [currentStatus, setCurrentStatus] = useState('Tất cả')
  const [visibleAddVehicle, setVisibleAddVehicle] = useState(false)
  const [visibleDetailModal, setVisibleDetailModal] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
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
  const [data, setData] = useState([])

  useEffect(() => {
    fetchTrafficData()
  }, [])

  const fetchTrafficData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getAllTraffics')
      setData(response.data)
      console.log('Data:', response.data)
    } catch (error) {
      console.error('Error fetching traffic data:', error)
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3001/api/addTraffics', formData)
      setVisibleAddVehicle(false)
      fetchTrafficData() // Fetch the updated data after adding a new vehicle
    } catch (error) {
      console.error('Error adding vehicle:', error)
    }
  }

  const fetchTrafficDetails = async (id) => {
    try {
     // const response = await axios.get(`http://localhost:3001/api/getTraffic/${id}`)
      //setSelectedVehicle(response.data)
      setVisibleDetailModal(true)
    } catch (error) {
      console.error('Error fetching traffic details:', error)
    }
  }

  const filteredData =
    currentStatus === 'Tất cả' ? data : data.filter((item) => item.Tinh_Trang === currentStatus)

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
                  {/* {dataFake.map((item, index) => ( */}
                    <CTableRow >
                      <CTableHeaderCell scope="row">{dataFake.PK_Id_Xe}</CTableHeaderCell>
                      <CTableDataCell>{dataFake.Bien_so}</CTableDataCell>
                      <CTableDataCell>{dataFake.route}</CTableDataCell>
                      <CTableDataCell>{dataFake.distance}</CTableDataCell>
                      <CTableDataCell>{dataFake.estimatedTime}</CTableDataCell>
                      <CTableDataCell
                        style={{
                          color:
                          dataFake.Tinh_Trang === 'Đang giao'
                              ? 'green'
                              : dataFake.Tinh_Trang === 'Bảo trì'
                                ? 'red'
                                : 'gray',
                        }}
                      >
                        {dataFake.Tinh_Trang}
                      </CTableDataCell>
                      <CTableDataCell>{dataFake.completionDate}</CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary">Tuỳ chỉnh</CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={() => fetchTrafficDetails(dataFake.PK_Id_Xe)}>
                              Xem chi tiết
                            </CDropdownItem>
                            <CDropdownItem>Chỉnh sửa</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem>Xoá phương tiện</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </CTableDataCell>
                    </CTableRow>
                  {/* ))} */}
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

      <CModal
        size="lg"
        visible={visibleDetailModal}
        onClose={() => setVisibleDetailModal(false)}
        aria-labelledby="DetailVehicleModal"
      >
        <CModalHeader closeButton>
          <CModalTitle id="DetailVehicleModal">Chi tiết phương tiện</CModalTitle>
        </CModalHeader>
        {dataFake && (
          <CModalBody>
            <CRow>
              <CCol md="6">
                <div className="detail-info-column">
                  <p>
                    <strong>Biển số:</strong> {dataFake.Bien_so}
                  </p>
                  <p>
                    <strong>Sức chứa:</strong> {dataFake.Suc_Chua}
                  </p>
                  <p>
                    <strong>Loại xe:</strong> {dataFake.ten_loai_xe}
                  </p>
                  <p>
                    <strong>Hãng xe:</strong> {dataFake.Hang_xe}
                  </p>
                  <p>
                    <strong>Ngày đăng kiểm:</strong>{' '}
                    {dataFake.Ngay_DK ? dataFake.Ngay_DK.split('T')[0] : ''}
                  </p>
                  <p>
                    <strong>Ngày hết hạn đăng kiểm:</strong>{' '}
                    {dataFake.Ngay_Het_DK ? dataFake.Ngay_Het_DK.split('T')[0] : ''}
                  </p>
                </div>
              </CCol>
              <CCol md="6">
                <div className="detail-info-column">
                  <p>
                    <strong>Tình trạng:</strong> {dataFake.Tinh_Trang}
                  </p>
                  <p>
                    <strong>Kích thước xe:</strong>
                  </p>
                  <ul>
                    <li>
                      <strong>Chiều dài:</strong> {dataFake.Chieu_dai} m
                    </li>
                    <li>
                      <strong>Chiều rộng:</strong> {dataFake.Chieu_rong} m
                    </li>
                    <li>
                      <strong>Chiều cao:</strong> {dataFake.Chieu_cao} m
                    </li>
                  </ul>
                </div>
              </CCol>
            </CRow>
            {/* Add more details as needed */}
          </CModalBody>
        )}
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleDetailModal(false)}>
            Đóng
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Cards
