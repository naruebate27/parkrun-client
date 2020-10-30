import React, {
  Fragment, useState, useContext,
} from 'react'
import { /* useQuery, */ useMutation } from 'react-apollo'
import {
  makeStyles,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import moment from 'moment'

import AppFooter from '../components/Footer'
import AuthContext from '../context/AuthContext'
// import getEvent from '../graphql/queries/getEventOne'
import RegisterEvent from '../graphql/mutations/registerEvent'

moment.locale('th')

const useStyles = makeStyles((theme) => ({
  bgSearchImage: {
    height: '250px',
    width: 'auto',
    // backgroundImage: `url(${''})`,
    // backgroundColor: '#eee',
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
  },
  md: {
    margin: theme.spacing(1),
  },
}))
const date = { date: new Date('2020-10-05T13:00:32.985+00:00') }

function createData(datetime, runner) {
  return {
    datetime, runner,
  }
}
const EventDetail = (props) => {
  const { history } = props
  const { eventId } = props.match.params
  const { user } = useContext(AuthContext)
  const classes = useStyles()
  // const { data = { eventOne: {} }, loading } = useQuery(getEvent)
  const [registerEvent] = useMutation(RegisterEvent)
  const [/* show, */ setShow] = useState(false)
  // const [statuscountmember, setStatusCountmember] = useState(true)
  // const allmember = []
  console.log(eventId)

  const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)
  const handleOK = async () => {
    try {
      await registerEvent({
        variables: {
          eventid: `${eventId}`,
          runnerid: `${user.id}`,
        },
      })
      alert('success')
      handleClose()
      history.push('/event')
    } catch (err) {
      console.log(err)
      const { networkError, graphQLErrors: [gqlError] } = err
      if (networkError) {
        // this.setState({ open: true, message: 'ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้' })
      } else if (gqlError) {
        // this.setState({ open: true, message: gqlError.message })
        console.log(gqlError.message)
      }
    }
  }
  const rows = [
    createData(moment(date.date).format('LLLL'),
      <Button variant="outlined" onClick={() => handleOK()}>เข้าร่วม</Button>,
    ),
    createData(moment(date.date).add(7, 'day').format('LLLL'),
      <Button variant="outlined" onClick={() => handleOK()}>เข้าร่วม</Button>,
    ),
    createData(moment(date.date).add(14, 'day').format('LLLL'),
      <Button variant="outlined" onClick={() => handleOK()}>เข้าร่วม</Button>,
    ),
  ]
  // const calrunner = (member) => {
  //   allmember = [...new Set(member)]
  //   console.log(allmember.length)
  //   return allmember.length
  // }

  return (
    <Fragment>
      <Container>
        <Grid container spacing={2}>
          {/* -------------------------------------------------------- */}
          <Grid item xs={12} md={12}>
            <br />
            <Typography align="center" variant="h4" component="h2">
              Park ThaiRun
            </Typography>
          </Grid>
          {/* -------------------------------------------------------- */}
          <Grid item sm={12} md={6}>
            <Card>
              <CardContent>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="caption table">
                    <TableHead>
                      <TableRow>
                        <TableCell>วันที่และเวลาที่จัดกิจกรรม</TableCell>
                        <TableCell align="center">นักวิ่ง</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.datetime}
                          </TableCell>
                          <TableCell align="center">{row.runner}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <br />
                <Typography variant="h6" component="h2" gutterBottom>ขอขอบคุณอาสาสมัครประจำสัปดาห์นี้</Typography>
                <Typography variant="subtitle1" gutterBottom>• Alan ROBERTS • Borrey KIM • Calum CARNEGIE • Eugene CARNEGIE • Megan CARNEGI</Typography>
                <Typography variant="subtitle2" gutterBottom>คุณสามารถดูหน้าอาสาสมัครของเรา สำหรับรายละเอียดเกี่ยวกับการมีส่วนร่วมในการทำให้ Parkrun01 เกิดขึ้น </Typography>
                <br />
                <Typography variant="h6" component="h2" gutterBottom>กำลังจะเกิดขึ้น</Typography>
                <Typography variant="subtitle2" gutterBottom>Parkrun01 ทุกวันศุกร์เวลา 17.00 น</Typography>
                <br />
                <Typography variant="h6" component="h2" gutterBottom>เคล็ดลับ</Typography>
                <Typography variant="subtitle2" gutterBottom>• อย่าลืมคิวอาร์โค้ด! ดูอีเมลการลงทะเบียนเริ่มต้นของคุณจดหมายข่าวสาร parkrun หรือคุณสามารถพิมพ์สำเนาคิวอาร์โค้ดของคุณได้ที่เว็ปไซต์ www.park.com และนำมาด้วย</Typography>
                <Typography variant="subtitle2" gutterBottom>• เราดำเนินนโยบาย“ ไม่มีคิวอาร์โค้ดไม่มีผลลัพธ์” หากคุณลืมคิวอาร์โค้ดที่พิมพ์ออกมา คุณจะไม่ได้รับการบันทึกผลลัพธ์</Typography>
                <Typography variant="subtitle2" gutterBottom>• มาเป็นครั้งแรก ? โปรดตรวจสอบว่าคุณได้ลงทะเบียนและอ่านรายละเอียดข้อกำหนดของ parkrun ด้วย</Typography>
                <Typography variant="subtitle2" gutterBottom>• คุณวิ่งในสัปดาห์นี้หรือไม่ ? ตรวจสอบหน้าผลลัพธ์และหน้าข่าวซึ่งมีรายงานเหตุการณ์ โดยปกติเราจะอัปเดตวันหรือสองวันหลังจากเหตุการณ์</Typography>
                <Typography variant="subtitle2" gutterBottom>• ไม่ได้รับอีเมลแจ้งผลของคุณ ? อาจอยู่ในโฟลเดอร์สแปมของคุณ เรามีเคล็ดลับบางประการในเว็ปไซต์การสนับสนุนของเราเพื่อช่วยคุณ</Typography>
                <Typography variant="subtitle2" gutterBottom>• ต้องการทราบข้อมูลเพิ่มเติมหรือไม่ ? อ่านเกี่ยวกับเราและข่าวสาร</Typography>
                <Typography variant="subtitle2" gutterBottom>• กิจกรรมนี้ดำเนินการโดยอาสาสมัครที่รักการวิ่ง หากคุณต้องการเข้าร่วมกับเรา ค้นหาข้อมูลเพิ่มเติมในหน้าอาสาสมัครของเรา</Typography>
                <Typography variant="subtitle2" gutterBottom>• สถิติเหตุการณ์โดยสรุปอยู่ที่ด้านล่างของทุกหน้า</Typography>
                <Typography variant="subtitle2" gutterBottom>• คำถามอื่นๆ อ่านไซต์สนับสนุนเฉพาะของเรา</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} md={6}>
            <Card>
              <CardContent>
                <div className={classes.bgSearchImage} />
                <br />
                <Typography variant="h6" component="h2" gutterBottom>ที่มาของ parkrun01</Typography>
                <Typography variant="subtitle2" gutterBottom>เป็นกิจกรรมเดิน-วิ่งระยะทาง 5 กม. เวลาเข้าเส้นชัยอยู่ที่คุณ</Typography>
                <br />
                <Typography variant="h6" component="h2" gutterBottom>จัดขึ้นวันไหน ?</Typography>
                <Typography variant="subtitle2" gutterBottom>สวนสาธารณะ ทุกวันศุกร์ของสัปดาห์  เวลา 17.00 ถึง 18.00 น.</Typography>
                <br />
                <Typography variant="h6" component="h2" gutterBottom>จัดขึ้นที่ไหน ?</Typography>
                <Typography variant="subtitle2" gutterBottom>ถนน พระรามที่ ๑ แขวง วังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330</Typography>
                <br />
                <Typography variant="h6" component="h2" gutterBottom>การเข้าร่วมมีค่าใช้จ่ายอะไรบ้าง ?</Typography>
                <Typography variant="subtitle2" gutterBottom>ไม่มีค่าใช้จ่าย - ฟรี! แต่โปรดลงทะเบียนก่อนเริ่มการแข่งขันครั้งแรก เพียงลงทะเบียนกับ parkrun เพียงครั้งเดียว อย่าลืมนำสำเนาคิวอาร์โค้ดของคุณที่พิมพ์ออกมาด้วย (เข้าสู่ระบบ) ถ้าคุณลืม! คุณจะไม่ได้รับการบันทึกเวลาวิ่งของคุณ</Typography>
                <br />
                <Typography variant="h6" component="h2" gutterBottom>ฉันต้องเร็วแค่ไหน ?</Typography>
                <Typography variant="subtitle2" gutterBottom>เราทุกคนวิ่งเพื่อความสนุกสนานของตัวเอง เชิญมาเข้าร่วมในสิ่งที่คุณต้องการ!</Typography>
                <br />
                <Typography variant="h6" component="h2" gutterBottom>ติดต่อฉันได้อย่างไร ?</Typography>
                <Typography variant="subtitle2" gutterBottom>จัดโดยอาสาสมัครทั้งหมด - อีเมล Admin@parkrun.com เพื่อช่วยเหลือคุณ</Typography>
                <br />
                <Typography variant="h6" component="h2" gutterBottom>ของรางวัล</Typography>
                <Typography variant="subtitle2" gutterBottom>ทุกสัปดาห์เรามีสะสมแต้มการเข้าร่วมใน Parkrun01 คุณสามารถใช้แต้มเพื่อแลกของรางวัลได้ใน www.parkrun.com บริษัทจะทำการจัดส่งของรางวัลถึงหน้าบ้านของคุณ โปรดมาร่วมงานกับเรา!</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* -------------------------------------------------------- */}
          <Grid item md={12}>
            <Grid container item style={{ backgroundColor: '#eee' }}>
              <Grid item md={4}>
                <Typography display="block" className={classes.md}>สถานที่: {0}</Typography>
                <Typography display="block" className={classes.md}>งานวิ่งทั้งหมด: {0}</Typography>
                <Typography display="block" className={classes.md}>เวลาวิ่งเข้าเส้นชัยโดยเฉลี่ย: {0}</Typography>
              </Grid>
              <Grid item md={4}>
                <Typography display="block" className={classes.md}>นักวิ่งทั้งหมด: {0}</Typography>
                <Typography display="block" className={classes.md}>อาสาสมัครทั้งหมด: {0}</Typography>
                <Typography display="block" className={classes.md}>อัตราเฉลี่ยของผู้เข้าร่วม: {0}</Typography>
              </Grid>
              <Grid item md={4}>
                <Typography display="block" className={classes.md}>ผู้เข้าเส้นชัย: {0}</Typography>
                <Typography display="block" className={classes.md}>PBs: {0}</Typography>
                <Typography display="block" className={classes.md}>สโมสร: {0}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* -------------------------------------------------------- */}
        </Grid>
      </Container>
      {/* -------------------------------------------------------- */}
      <AppFooter title="Footer" description="Something here to give the footer a purpose!" />
    </Fragment>
  )
}

export default EventDetail
// import React, { useState, useContext } from 'react'
// import { useQuery, useMutation } from 'react-apollo'
// import {
//   Spinner, Button, Modal, Row, Col,
// } from 'react-bootstrap'
// import Container from 'react-bootstrap/Container'

// import moment from 'moment'

// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// // import { faClock, faCircle } from '@fortawesome/free-solid-svg-icons'

// import { AuthContext } from '../context/AuthContext'
// import getEvent from '../graphql/queries/getEventOne'
// import RegisterEvent from '../graphql/mutations/registerEvent'

// const EventDetail = (props) => {
//   const { history } = props
//   const { eventid } = props.match.params
//   const { user } = useContext(AuthContext)
//   const { data = { eventOne: {} }, loading } = useQuery(getEvent, {
//     variables: {
//       _id: String(eventid),
//     },
//   })

//   const [registerEvent] = useMutation(RegisterEvent)
//   const [show, setShow] = useState(false)
//   const handleClose = () => setShow(false)
//   const handleShow = () => setShow(true)
//   const handleOK = async () => {
//     try {
//       await registerEvent({
//         variables: {
//           eventid: String(eventid),
//           userid: String(user.id),
//         },
//       })
//       console.log(user._id)
//       alert('success')
//       handleClose()
//       history.push('/qrcode')
//     } catch (err) {
//       console.log(err)
//       const { networkError, graphQLErrors: [gqlError] } = err
//       if (networkError) {
//         // this.setState({ open: true, message: 'ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้ในขณะนี้' })
//       } else if (gqlError) {
//         // this.setState({ open: true, message: gqlError.message })
//         console.log(gqlError.message)
//       }
//     }
//   }

//   const calDate = (end_date, start_date) => {
//     const enddate = new Date(end_date)
//     const startdate = new Date(start_date)
//     const diffTime = Math.abs(enddate - startdate)
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
//     return diffDays
//   }
//   if (loading) {
//     return (
//       <Spinner animation="border" role="status">
//         <span className="sr-only">Loading...</span>
//       </Spinner>
//     )
//   }

//   return (
//     <Container>
//       {/* <picture>
//         <img src={data.eventOne.banner}/>
//       </picture> */}
//       <div style={{ width: '100%' }}>
//         <div style={{ float: 'right', marginTop: '2%' }}>
//           <b><h3>ชื่อ: {data.eventOne.name}</h3></b><br />
//           <b><h3>สถานที่จัด: {data.eventOne.location}</h3></b><br />
//           <b><h3>จำนวนรับสมัคร: {data.eventOne.member} คน</h3></b><br />
//           <b><h3>ระยะทาง: {data.eventOne.distance} กิโลเมตร</h3></b><br />
//           <b><h3>รายละเอียด: {data.eventOne.description}</h3></b><br />
//           <FontAwesomeIcon size="1x" icon={faCircle} color="green" />
//           <b><p style={{ display: 'inline', marginLeft: '10px', marginRight: '30px' }}>start: {moment(data.eventOne.start_date).format('YYYY/MM/DD')}</p></b>
//           <FontAwesomeIcon size="1x" icon={faCircle} color="red" />
//           <b><p style={{ display: 'inline', marginLeft: '10px' }}>end: {moment(data.eventOne.end_date).format('YYYY/MM/DD')}</p></b>
//         </div>
//       </div>

//       <Row style={{ paddingTop: '20px', marginBottom: '20px', width: '100%' }}>
//         <Col>
//           <FontAwesomeIcon size="2x" icon={faClock} style={{ marginLeft: '11px' }} />
//           <p style={{ fontSize: '13px' }}><b>{calDate(data.eventOne.end_date, data.eventOne.start_date)} Day</b></p>
//         </Col>
//       </Row>
//       <>

//         <Button variant="primary" onClick={handleShow}>
//           สมัครงานวิ่ง
//         </Button>
//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>ยืนยันการสมัคร</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>?????????????????????</Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               ยกเลิก
//             </Button>
//             <Button variant="primary" onClick={handleOK}>
//               ตกลง
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </>
//     </Container>
//   )
// }

// export default EventDetail
