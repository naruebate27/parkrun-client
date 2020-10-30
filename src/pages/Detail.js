import React, { useState, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Layout, Typography, Modal } from 'antd'
import Button from '@material-ui/core/Button'

import CircularProgress from '@material-ui/core/CircularProgress'

import RegisterEvent from '../graphql/mutations/registerEvent'

import getEvent from '../graphql/queries/getEventOne'
import AuthContext from '../context/AuthContext'

// import Login from './Login'
// import './Pages.css'
import 'antd/dist/antd.css'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography

const Detail = (props) => {
  const { history } = props
  const { eventid } = props.match.params
  const { user } = useContext(AuthContext)
  const { data = { eventOne: {} }, loading } = useQuery(getEvent, {
    variables: {
      _id: String(eventid),
    },
  })

  const [registerEvent] = useMutation(RegisterEvent)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleOK = async () => {
    try {
      await registerEvent({
        variables: {
          eventid: String(eventid),
          userid: String(user.id),
        },
      })
      console.log(user._id)
      alert('success')
      handleClose()
      history.push('/qrcode')
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

  // const calDate = (end_date, start_date) => {
  //   const enddate = new Date(end_date)
  //   const startdate = new Date(start_date)
  //   const diffTime = Math.abs(enddate - startdate)
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  //   return diffDays
  // }
  if (loading) {
    return (
      <CircularProgress animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </CircularProgress>
    )
  }
  return (
    <Content className="body">
      <article className="article">
        <div className="jumbotron">
          <div className="row">
            <div className="col-md-6">
              <hr /><Title>{data.eventOne.name}</Title>
              <div className="divider divider-short border-primary my-4" />
              <p className="hero-lead">สถานที่จัด: {data.eventOne.location}</p>
              <p className="hero-lead">จำนวนรับสมัคร: {data.eventOne.member} คน</p>
              <p className="hero-lead">ระยะทาง: {data.eventOne.distance} กิโลเมตร</p>
              <p className="hero-lead">รายละเอียด: {data.eventOne.description}</p>
            </div>
          </div>
        </div>
        <br />
        <div>
          <img style={{ width: '100%', height: '400px' }} alt="banner" src={data.eventOne.banner} />
        </div>
      </article>
      <>
        <Button type="primary" onClick={handleShow}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={show}
          onOk={handleOK}
          onCancel={handleClose}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    </Content>
  )
}
export default Detail
