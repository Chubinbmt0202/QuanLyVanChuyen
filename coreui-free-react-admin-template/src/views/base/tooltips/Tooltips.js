import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CLink, CTooltip, CRow, CCol } from '@coreui/react'
import { useParams } from 'react-router-dom'

const Tooltips = () => {
  const { OrderID } = useParams()
  console.log(OrderID)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Mã đơn hàng:</strong> <small>{OrderID} </small>
          </CCardHeader>
          <CCardBody>
            <strong>Thông tin đơn hàng</strong>
            <br />
            <h3>Mã đơn hàng: {OrderID}</h3>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tooltips
