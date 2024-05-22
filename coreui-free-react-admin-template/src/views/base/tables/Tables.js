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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from '@coreui/react'
import { DocsExample } from 'src/components'







const Tables = () => {





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
                    <CDropdown>
                      <CDropdownToggle color="secondary">Tuỳ chỉnh</CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem>Xem chi tiết</CDropdownItem>
                        <CDropdownItem>Chỉnh sửa</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
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
