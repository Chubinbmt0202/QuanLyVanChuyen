/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
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
  CFormLabel,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CForm,
  CFormInput,
} from '@coreui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Accordion = () => {
  const [currentStatus, setCurrentStatus] = useState('Tất cả')
  const [dataOrder, setDataOrder] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/getAllOrders')
      setDataOrder(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const filteredData =
    currentStatus === 'Tất cả'
      ? dataOrder
      : dataOrder.filter((item) => item.TrangThai === currentStatus)

  const handleDetailOrder = (OrderID) => {
    navigate(`/base/tooltips/${OrderID}`)
  }

  const handleUpdate = (OrderID) => {
    alert(`Chỉnh sửa đơn hàng ${OrderID}`)
  }

  const handleProcessOrder = (OrderID) => {
    alert(`Xử lý đơn hàng ${OrderID}`)
    navigate(`/base/tooltips/${OrderID}`)
  }

  const handleViewStatus = (OrderID) => {
    alert(`Xem trạng thái đơn hàng ${OrderID}`)
  }

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
          <strong>Điều phối tài xế</strong>
        </CCardHeader>
        <CForm className="row g-3">
          <CCol xs="auto">
            <CFormLabel htmlFor="inputPassword2" className="visually-hidden">
              Password
            </CFormLabel>
            <CFormInput type="text" id="inputPassword2" placeholder="Tìm kiếm đơn hàng" />
          </CCol>
          <CCol xs="auto">
            <CButton color="primary" type="submit" className="mb-3">
              Tìm kiếm
            </CButton>
          </CCol>
        </CForm>
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
                  active={currentStatus === 'Chưa giao hàng'}
                  onClick={() => setCurrentStatus('Chưa giao hàng')}
                >
                  Chờ xử lý
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Đang giao hàng'}
                  onClick={() => setCurrentStatus('Đang giao hàng')}
                >
                  Đang giao
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Đã giao hàng'}
                  onClick={() => setCurrentStatus('Đã giao hàng')}
                >
                  Đã hoàn tất
                </CNavLink>
              </CNavItem>
            </CNav>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Mã đơn hàng</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Khách hàng</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngày đặt hàng</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngày giao dự kiến</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Số lượng</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tổng tiền đơn hàng</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tuỳ chọn</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredData.map((item, index) => (
                    <CTableRow key={item.id}>
                      <CTableHeaderCell scope="row">{item.MaDH}</CTableHeaderCell>
                      <CTableDataCell>{item.TenKH}</CTableDataCell>
                      <CTableDataCell>{item.NgayDatHang}</CTableDataCell>
                      <CTableDataCell>{item.NgayGiaoHang}</CTableDataCell>
                      <CTableDataCell
                        style={{
                          color:
                            item.TrangThai === 'Đang giao hàng'
                              ? 'green'
                              : item.TrangThai === 'Chưa giao hàng'
                              ? 'red'
                              : 'gray',
                        }}
                      >
                        {item.TrangThai}
                      </CTableDataCell>
                      <CTableDataCell>{item.KhoiLuong}</CTableDataCell>
                      <CTableDataCell>{item.TongTien}</CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary">Tuỳ chỉnh</CDropdownToggle>
                          <CDropdownMenu>
                            {item.TrangThai === 'Chưa giao hàng' && (
                              <>
                                <CDropdownItem onClick={() => handleProcessOrder(item.MaDH)}>
                                  Xử lý
                                </CDropdownItem>
                                <CDropdownItem onClick={() => handleUpdate(item.MaDH)}>
                                  Chỉnh sửa
                                </CDropdownItem>
                              </>
                            )}
                            {item.TrangThai === 'Đang giao hàng' && (
                              <CDropdownItem onClick={() => handleViewStatus(item.MaDH)}>
                                Xem trạng thái
                              </CDropdownItem>
                            )}
                            {item.TrangThai === 'Đã giao hàng' && (
                              <CDropdownItem onClick={() => handleDetailOrder(item.MaDH)}>
                                Xem chi tiết
                              </CDropdownItem>
                            )}
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
  )
}

export default Accordion
