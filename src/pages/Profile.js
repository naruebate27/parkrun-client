import React, { Fragment, useContext } from 'react'
import { useQuery } from 'react-apollo'
import 'antd/dist/antd.css'
import { Table } from 'antd'
import {
  makeStyles,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  withStyles,
  LinearProgress,
  CircularProgress,
} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import QRCode from 'react-qr-code'

import getEvent from '../graphql/queries/getAllEvent'
import getUser from '../graphql/queries/getUserOne'
import AuthContext from '../context/AuthContext'
import AppFooter from '../components/Footer'

const useStyles = makeStyles((theme) => ({
  mt: {
    marginTop: theme.spacing(1),
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  large: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',

  },
  image: {
    width: '150px',
    height: '150px',
  },
  qr: {
    marginLeft: '-50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    flexDirection: 'column',
  },
  submit: {
    width: theme.spacing(15),
    height: theme.spacing(4),
    backgroundColor: '#fff',
  },
  root: {
    fontFamily: 'sans-serif',
  },
  h1: {
    textAlign: 'center',
  },
  qrcode: {
    textAlign: 'center',
  },

}))

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 30,
    width: 800,
    borderRadius: 50,
    margin: 'auto',
    marginTop: theme.spacing(10),
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 50,
    backgroundColor: '#20B2AA',
  },
}))(LinearProgress)

const runner = [
  {
    title: 'ชื่องานวิ่ง',
    dataIndex: 'parkname',
    width: 100,
  },
  {
    title: 'วันที่',
    dataIndex: 'date',
    width: 120,
  },
  {
    title: 'ระยะเวลาที่วิ่งได้',
    dataIndex: 'finish',
    width: 120,
  },
]

const datarunner = []
for (let i = 1; i < 50; i++) {
  datarunner.push({
    key: i,
    parkname: 'Parkrun01',
    date: '01-11-2020',
    finish: '10.00 นาที',
  })
}

const volunteer = [
  {
    title: 'ชื่องานวิ่ง',
    dataIndex: 'parkname',
    width: 100,
  },
  {
    title: 'วันที่',
    dataIndex: 'date',
    width: 120,
  },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    width: 120,
  },
]

const datavolunteer = []
for (let i = 1; i < 50; i++) {
  datavolunteer.push({
    key: i,
    order: i,
    parkname: 'Parkrun01',
    date: '01-11-2020',
    status: 'เข้าร่วมแล้ว',
  })
}

const ProfilePage = () => {
  const { user } = useContext(AuthContext)
  const { data = { userOne: {} }, loading } = useQuery(getUser, {
    varables: {
      _id: `${user.id}`,
    },
  })
  console.log(data)

  const { data2 = { eventMany: {} } } = useQuery(getEvent, {
    varables: {
      _id: `${user.id}`,
    },
  })
  console.log(data2)
  const classes = useStyles()
  return (
    <Fragment>
      <Container maxWidth="lg">
        <Grid container spacing={2} className={classes.mt}>
          <Grid item md={10}>
            <Grid container className={classes.profile} justify="center" alignItems="center">
              <Grid item md={2}>
                <img src="https://talk.mthai.com/storage/uploads/2019/03/03/293ed2419faa74726516ab5a1be107dd.jpeg" alt="" className={classes.large} />
              </Grid>
              <Grid item md={3}>
                {loading ? (
                  <CircularProgress animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </CircularProgress>
                ) : (
                  <>
                    <Typography variant="h6">ชื่อ: {data.userOne.firstname} {data.userOne.lastname}</Typography>
                    <Typography variant="subtitle1">อีเมล: {data.userOne.email}</Typography>
                  </>
                )}
              </Grid>
              <Grid item md={3}>
                <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                  >
                    แก้ไขโปรไฟล์
                  </Button>
                  <SettingsIcon />
                </div>
                <Typography variant="subtitle1">เบอร์ติดต่อ: 098-5170491</Typography>
              </Grid>
              <Grid item md={2} className={classes.qr}>
                <QRCode value={`${user.id}`} size="120" />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                >
                  พิมพ์คิวอาร์โค้ด
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item spacing={2} md={9}>
            <Grid item md={12}>
              <Paper variant="outlined" style={{ height: '200px' }}>
                <Typography variant="h6" align="center">คะแนนการเข้าร่วม Parkrun ของคุณ</Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>คุณเข้าร่วมแล้ว 15 ครั้ง</Typography>
                <BorderLinearProgress variant="determinate" value={50} />
              </Paper>
            </Grid>
            <Grid item md={6}>
              <Typography variant="h6" style={{ margin: '10px' }}>นักวิ่ง</Typography>
              <Paper variant="outlined">
                <Table columns={runner} dataSource={datarunner} pagination={{ pageSize: 5, position: ['bottomCenter'] }} />
              </Paper>
            </Grid>
            <Grid item md={6}>
              <Typography variant="h6" style={{ margin: '10px' }}>อาสาสมัคร</Typography>
              <Paper variant="outlined">
                <Table columns={volunteer} dataSource={datavolunteer} pagination={{ pageSize: 5, position: ['bottomCenter'] }} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <AppFooter description="803, 805, 807, 809 โครงการ stadium One ซอย จุฬาลงกรณ์ 4 ถนน บรรทัดทอง แขวง วังใหม่ เขต ปทุมวัน กรุงเทพฯ 10330" />
    </Fragment>
  )
}

export default ProfilePage
