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

const Tables = () => {

  const dataFake = {
    "IdKh":"1",
    "Ten_KH" :"Võ Đăng Vịnh",
    "GioiTinh":"Nam",
    "SDT":"0372254619",
    "NgaySinh":"07-11-2003",
    "DiaChi" : "12 Cao Thắng Hải Châu Đà Nẵng",
    "Email": "lagger07112003@gmail.com",
    "NgayThamGia":"07-11-2003",
  
  }

  const [currentStatus, setCurrentStatus] = useState('Tất cả')
  const [visibleAddCustomer, setVisibleAddCustomer] = useState(false)
  const [visibleUpdateCustomer, setVisibleUpdateCustomer] = useState(false)
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
      setVisibleAddCustomer(false)
      fetchTrafficData() // Fetch the updated data after adding a new customer
    } catch (error) {
      console.error('Error adding vehicle:', error)
    }
  }


  const handleSubmitUpdate = async () => {
    try {
      await axios.post('http://localhost:3001/api/addTraffics', formData)
      setVisibleUpdateCustomer(false)
      fetchTrafficData() // Fetch the updated data after adding a new customer
    } catch (error) {
      console.error('Error adding vehicle:', error)
    }
  }


const fetchUpdateCustomer = async (id) =>
  {
    try{
        setVisibleUpdateCustomer(true);
    }
    catch(error)
    {
      console.error("Error when get customer" , error);
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
          <strong>Danh sách Khách Hàng</strong>
        </CCardHeader>
        <CButton color="primary" onClick={() => setVisibleAddCustomer(true)}>
          Thêm Khách Hàng
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

            </CNav>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Tên Khách Hàng</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Số Điện Thoại</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngày Sinh</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Địa Chỉ</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tuỳ chọn</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {/* {dataFake.map((item, index) => ( */}
                  <CTableRow >
                    <CTableHeaderCell scope="row">{dataFake.Ten_KH}</CTableHeaderCell>
                    <CTableDataCell>{dataFake.SDT}</CTableDataCell>
                    <CTableDataCell>{dataFake.NgaySinh}</CTableDataCell>
                    <CTableDataCell>{dataFake.DiaChi}</CTableDataCell>
                    <CTableDataCell>{dataFake.Email}</CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="secondary">Tuỳ chỉnh</CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem onClick={() => fetchTrafficDetails(dataFake.IdKh)}>
                            Xem chi tiết
                          </CDropdownItem>
                          <CDropdownItem onClick={() => fetchUpdateCustomer(dataFake.IdKh)}>Chỉnh sửa</CDropdownItem>
                          <CDropdownDivider />
                          <CDropdownItem>Xoá Khách Hàng</CDropdownItem>
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
        visible={visibleAddCustomer}
        onClose={() => setVisibleAddCustomer(false)}
        aria-labelledby="AddVehicleModal"
      >
        <CModalHeader>
          <CModalTitle id="AddVehicleModal">Thêm Khách Hàng</CModalTitle>
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
            id="Ten_KH"
            onChange={handleChange}
            placeholder="Tên Khách Hàng"
            aria-describedby="exampleFormControlInputHelpInline"
          />
           <CFormInput
            type="text"
            style={{ flex: '1 1 45%' }}
            id="SDT"
            onChange={handleChange}
            placeholder="Số Điện Thoại"
            aria-describedby="exampleFormControlInputHelpInline"
          />
          <CFormInput
            type="text"
            style={{ flex: '1 1 45%' }}
            id="Email"
            onChange={handleChange}
            placeholder="Email"
            aria-describedby="exampleFormControlInputHelpInline"
          />
          <CFormInput
            type="date"
            style={{ flex: '1 1 45%' }}
            id="Ngay_Sinh"
            placeholder="Ngày Sinh"
            onChange={handleChange}
          />
          <CFormInput
            type="text"
            style={{ flex: '1 1 45%' }}
            id="Dia_Chi"
            onChange={handleChange}
            placeholder="Địa Chỉ"
          />
         
          
        </CForm>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleAddCustomer(false)}>
            Đóng
          </CButton>
          <CButton color="primary" onClick={handleSubmitUpdate}>
            Lưu
          </CButton>
        </CModalFooter>
      </CModal>




      <CModal
        size="lg"
        visible={visibleUpdateCustomer}
        onClose={() => setVisibleUpdateCustomer(false)}
        aria-labelledby="UpdateCustommer"
      >
        <CModalHeader>
          <CModalTitle id="UpdateCustommer">Chỉnh Sửa Khách Hàng</CModalTitle>
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
            id="Ten_KH"
            onChange={handleChange}
            placeholder="Tên Khách Hàng"
            aria-describedby="exampleFormControlInputHelpInline"
          />
           <CFormInput
            type="text"
            style={{ flex: '1 1 45%' }}
            id="SDT"
            onChange={handleChange}
            placeholder="Số Điện Thoại"
            aria-describedby="exampleFormControlInputHelpInline"
          />
          <CFormInput
            type="text"
            style={{ flex: '1 1 45%' }}
            id="Email"
            onChange={handleChange}
            placeholder="Email"
            aria-describedby="exampleFormControlInputHelpInline"
          />
          <CFormInput
            type="date"
            style={{ flex: '1 1 45%' }}
            id="Ngay_Sinh"
            placeholder="Ngày Sinh"
            onChange={handleChange}
          />
          <CFormInput
            type="text"
            style={{ flex: '1 1 45%' }}
            id="Dia_Chi"
            onChange={handleChange}
            placeholder="Địa Chỉ"
          />
         
          
        </CForm>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleUpdateCustomer(false)}>
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
          <CModalTitle id="DetailVehicleModal">Chi tiết khách hàng</CModalTitle>
        </CModalHeader>
        {dataFake && (
          <CModalBody>
            <CRow>
              <CCol md="6">
                <div className="detail-info-column">
                  <p>
                    <strong>Tên Khách Hàng:</strong> {dataFake.Ten_KH}
                  </p>
                  <p>
                    <strong>Giới Tính:</strong> {dataFake.GioiTinh}
                  </p>
                  <p>
                    <strong>Ngày Sinh :</strong> {dataFake.NgaySinh}
                  </p>
                  <p>
                    <strong>Số Điện Thoại :</strong> {dataFake.SDT}
                  </p>
                  <p>
                    <strong>Email  :</strong> {dataFake.Email}
                  </p>
                  <p>
                    <strong>Ngày Tham Gia  :</strong> {dataFake.NgayThamGia}
                  </p>
                </div>
              </CCol>
              <CCol md="6">
                <div className="detail-info-column">
                  <p>
                    <strong>Số Đơn Hàng Đã Đặt:</strong> 3
                  </p>
                  <p>
                    <strong>Các Đơn Hàng:</strong>
                  </p>
                  <ul>
                    <li>
                      <strong>Tên Hàng Hóa:</strong> Gấu Bông 
                    </li>
                    <li>
                      <strong>Tình Trạng:</strong> Đang Giao
                    </li>
                    <li>
                      <strong>Giá Tiền:</strong> 100.000.000 VND
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <strong>Tên Hàng Hóa:</strong> Gấu Bê Tông
                    </li>
                    <li>
                      <strong>Tình Trạng:</strong> Đã Giao
                    </li>
                    <li>
                      <strong>Giá Tiền:</strong> 200.000.000 VND
                    </li>
                  </ul>
                </div>
              </CCol>
            </CRow>
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

export default Tables
