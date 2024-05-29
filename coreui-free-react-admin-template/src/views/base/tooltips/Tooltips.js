/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CTooltip,
  CRow,
  CCol,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CForm,
  CContainer,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import { DatePicker } from '@mui/x-date-pickers'
import axios from 'axios'

const Tooltips = () => {
  const { OrderID } = useParams()
  const [dataOrder, setDataOrder] = useState(null)
  const [driverIdle, setDriverIdle] = useState(null)
  const [vehicleIdle, setVehicleIdle] = useState(null)
  const [selectedDriver, setSelectedDriver] = useState('')
  const [driverPhoneNumber, setDriverPhoneNumber] = useState('')

  const handleLoadData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/getDetailOrderByID/${OrderID}`)
      console.log('API Response:', res.data)
      setDataOrder(res.data[0])
    } catch (error) {
      console.log('API Error:', error)
    }
  }

  const handleGetDriverIlde = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/getAllDriversIdle`)
      console.log('API Response:', res.data)
      setDriverIdle(res.data)
    } catch (error) {
      console.log('API Error:', error)
    }
  }

   const handleGetVehicleIdle = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/getAllVehicles`)
      console.log('API Response:', res.data)
      setVehicleIdle(res.data)
    } catch (error) {
      console.log('API Error:', error)
    }
  }

  useEffect(() => {
    if (OrderID) {
      handleLoadData()
      handleGetDriverIlde()
      handleGetVehicleIdle()
    }
  }, [OrderID])

  if (!OrderID) {
    return <div>Đơn hàng không tồn tại</div>
  }
  if (dataOrder === null) {
    return <div>Loading...</div> // Show loading state
  }
  if (!dataOrder) {
    return <div>Error loading data</div> // Handle error state
  }

  const {
    'Ngày đặt hàng': orderDate,
    'Ngày giao': deliveryDate,
    'Tên dịch vụ vận chuyển': shippingService,
    'Tên khách hàng': customerName,
    'Số điện thoại khách hàng': customerPhone,
    'Địa chỉ khách hàng': customerAddress,
    'Số điện thoại tài xế': driverPhone,
    'Tài xế phụ trách': driverName,
    'Các sản phẩm mà khách hàng đặt': productString,
  } = dataOrder

  // Hàm để cắt chuỗi sản phẩm thành các thành phần riêng lẻ
  function parseProductString(productString) {
    if (productString) {
      const parts = productString.split(' - ')
      if (parts.length === 4) {
        const [productType, productName, pricePart, quantityPart] = parts
        const price = pricePart.replace('Giá: ', '').trim()
        const quantity = quantityPart.replace('Số lượng: ', '').trim()
        return {
          productType: productType.trim(),
          productName: productName.trim(),
          price: price,
          quantity: quantity,
        }
      }
    }
    return null // Trả về null nếu chuỗi không khớp định dạng hoặc không tồn tại
  }

  // Xử lý chuỗi sản phẩm
  const parsedProduct = parseProductString(productString)

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Mã đơn hàng:</strong> <small>{OrderID}</small>
          </CCardHeader>
          {dataOrder && (
            <CCardBody>
              <CContainer>
                <CRow>
                  <CCol xs={4}>
                    <div>
                      <p>Ngày đặt hàng</p>
                      <CFormInput id="inputAddress" value={orderDate} readOnly />
                      <div className=" mt-3">
                        <DatePicker
                          className=" w-auto"
                          label="Ngày giao dự kiến"
                          name="startDate"
                        />
                      </div>
                      <p className="mt-3 mb-1">Tên dịch vụ vận chuyển</p>
                      <CFormInput
                        id="inputAddress"
                        className=" mb-3"
                        value={shippingService}
                        readOnly
                      />
                    </div>
                    <div>
                      <strong className=" mt-3">Thông tin khách hàng</strong>
                      <CFormInput id="inputAddress" value={customerName} readOnly />
                      <p className="mt-3 mb-1">Số điện thoại</p>
                      <CFormInput id="inputAddress" value={customerPhone} readOnly />
                      <p className="mt-3 mb-1">Địa chỉ khách hàng</p>
                      <CFormInput id="inputAddress" value={customerAddress} readOnly />
                    </div>
                  </CCol>
                  <CCol xs={8}>
                    <strong className=" mt-3">Sản phẩm trong đơn hàng</strong>
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Loại sản phẩm</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Tên sản phẩm</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Giá</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Số lượng</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {parsedProduct ? (
                          <CTableRow>
                            <CTableHeaderCell scope="row">1</CTableHeaderCell>
                            <CTableDataCell>{parsedProduct.productType}</CTableDataCell>
                            <CTableDataCell>{parsedProduct.productName}</CTableDataCell>
                            <CTableDataCell>{parsedProduct.price}</CTableDataCell>
                            <CTableDataCell>{parsedProduct.quantity}</CTableDataCell>
                          </CTableRow>
                        ) : (
                          <CTableRow>
                            <CTableDataCell colSpan="5">
                              Chuỗi sản phẩm không hợp lệ hoặc không tồn tại.
                            </CTableDataCell>
                          </CTableRow>
                        )}
                      </CTableBody>
                    </CTable>
                    <CRow>
                      <CCol xs={6}>
                        <strong className=" mt-3">Vận chuyển</strong>
                        <p className="mt-3 mb-1">Trọng lượng tổng sản phẩm</p>
                        <CFormInput
                          id="inputAddress"
                          value={dataOrder['Tổng khối lượng']}
                          readOnly
                        />
                        <strong className=" mt-5">
                          Phí vận chuyển ước tính: <span>123.000 vnđ</span>
                        </strong>
                        <CFormCheck
                          id="flexCheckChecked"
                          label="Thanh toán 50% số tiền còn lại"
                          defaultChecked
                        />
                      </CCol>
                      <CCol xs={6}>
                        <strong className="mt-3">Tài xế</strong>
                        <p className="mt-3 mb-1">Tên tài xế</p>
                        <CFormSelect
                          aria-label="Default select example"
                          value={selectedDriver}
                          onChange={(e) => {
                            const selectedDriverId = e.target.value
                            console.log('Selected driver:', selectedDriverId)
                            console.log('Driver list:', driverIdle)
                            const selectedDriver = driverIdle.find(
                              (driver) => driver.PK_Id_TX == selectedDriverId,
                            )
                            console.log('Selected driver:', selectedDriver)
                            setSelectedDriver(selectedDriverId)
                            setDriverPhoneNumber(selectedDriver ? selectedDriver.SDT : '') // Update driver phone number
                          }}
                        >
                          <option value="">Chọn tài xế</option>
                          {Array.isArray(driverIdle) &&
                            driverIdle.map((driver) => (
                              <option key={driver.PK_Id_TX} value={driver.PK_Id_TX}>
                                {driver.Ten_TX}
                              </option>
                            ))}
                        </CFormSelect>
                        <p className="mt-3 mb-1">Số điện thoại tài xế</p>
                        <CFormInput id="inputAddress" value={driverPhoneNumber} readOnly />

                        <p className="mt-3 mb-1">Phương tiện vận chuyển</p>
                        <CFormSelect
                          aria-label="Default select example"
                          options={[
                            'Chọn phương tiện vận chuyển',
                            { label: 'One', value: '1' },
                            { label: 'Two', value: '2' },
                            { label: 'Three', value: '3', disabled: true },
                          ]}
                        />
                        <CButton color="primary" className=" m-2">
                          Xác nhận
                        </CButton>
                        <CButton color="secondary">Huỷ</CButton>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CContainer>
            </CCardBody>
          )}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tooltips
