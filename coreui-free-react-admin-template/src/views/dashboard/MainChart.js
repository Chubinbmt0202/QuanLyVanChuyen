import React, { useEffect, useRef, useState } from 'react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const MainChart = () => {



  function getDaysInMonth(year, month) {
    let firstDay = new Date(year, month - 1, 1);
    let lastDay = new Date(year, month, 0);
    let days = [];
    for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
      days.push(i);
    }
    return days;
  }



  const fakeDataChartMonth = [53, 92, 86, 68, 61, 82, 77, 96, 91, 56, 62, 55]
  const fakeDataChartMonth2 = [274, 189, 471, 327, 102, 230, 417, 392, 162, 292, 203, 478]
  const fakeDataChartDay = [84, 97, 91, 67, 76, 51, 83, 62, 90, 89, 88, 73, 53, 100, 74, 65, 94, 92, 87, 58, 55, 78, 85, 68, 56, 52, 59, 99, 95, 71]
  const fakeDataChartDay2 = [56, 92, 77, 70, 73, 74, 63, 61, 92, 54, 84, 96, 95, 59, 67, 66, 94, 97, 71, 98, 86, 60, 52, 57, 53, 98, 81, 79, 69, 62]


  const DateMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const DateDay = getDaysInMonth(2024, 6);
  const chartRef = useRef(null)
  const [valueactive, setValueActive] = useState("Month")
  const [dateShow, setDateShow] = useState(DateDay)
  const [dataorder, setDataOrder] = useState([])
  const [datachart, setDataChart] = useState([]);
  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    })
    fetchDataOder();
  }, [chartRef])

  const random = () => Math.round(Math.random() * 100)

  const fetchDataOder = async () => {
    const res = await axios.get('http://localhost:3001/api/getAllOrders')
    setDataOrder(res.data);
    res.data.forEach((item) => {
      var dateObject = new Date(item.NgayDatHang); 
      console.log(dateObject)
      var month = dateObject.getMonth() + 1
      var day = dateObject.getDate();
      console.log(month +"" + day)
    })
  }


  const handleChangeDate = (event) => {
    const valuActive = event.target.innerText;
    setValueActive(valuActive);
    if (valuActive === 'Month') {
      setDateShow(DateDay);
      setDataChart(fakeDataChartDay)
      console.log(datachart)
    }
    else {
      setDateShow(DateMonth);
      setDataChart(fakeDataChartMonth)
      console.log(datachart)
    }


  }

  return (
    <>

      <CButton color="primary" className="float-end">
        <CIcon icon={cilCloudDownload} />
      </CButton>
      <CButtonGroup className="float-end me-3">
        {['Month', 'Year'].map((value) => (
          <CButton
            color="outline-secondary"
            key={value}
            className="mx-0"
            active={value === valueactive}
            onClick={handleChangeDate}
          >
            {value}
          </CButton>
        ))}
      </CButtonGroup>

      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: dateShow,
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
              borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data: datachart
              ,
              fill: true,
            },
            {
              label: 'My Second dataset',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-success'),
              pointHoverBackgroundColor: getStyle('--cui-success'),
              borderWidth: 2,
              data: [287, 452, 375, 102, 357, 426, 373, 458, 270, 245, 172, 301, 259, 396, 96, 278, 345, 407, 111, 310, 149, 400, 405, 243, 344, 471, 436, 331, 134, 151]
              ,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              max: 500,
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart
