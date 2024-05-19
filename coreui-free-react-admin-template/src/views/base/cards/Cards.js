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

const Cards = () => {
  const [currentStatus, setCurrentStatus] = useState('Tất cả')
  const [visibleAddVehicle, setVisibleAddVehicle] = useState(false)

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
        <CForm style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          <CFormInput
            type="text"
            style={{ width: '45%' }}
            id="exampleFormControlInput1"
            placeholder="Biển số xe"
            aria-describedby="exampleFormControlInputHelpInline"
          />
          <CFormSelect
            style={{ width: '45%' }}
            aria-label="Default select example"
            options={[
              'Chọn loại phương tiện',
              { label: 'Xe tải lớn', value: '1' },
              { label: 'Xe tải nhỏ', value: '2' },
              { label: 'Xe rơ móoc', value: '3', disabled: true },
            ]}
          />
          <CFormSelect
            style={{ width: '45%' }}
            aria-label="Default select example"
            options={[
              'Chọn hãng xe',
              { label: 'Xe tải lớn', value: '1' },
              { label: 'Xe tải nhỏ', value: '2' },
              { label: 'Xe rơ móoc', value: '3', disabled: true },
            ]}
          />
        </CForm>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleAddVehicle(false)}>
            Đóng
          </CButton>
          <CButton color="primary">Lưu</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Cards
