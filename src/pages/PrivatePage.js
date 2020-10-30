import React from 'react'
import {
  Switch,
} from 'react-router-dom'

import PrivateRoute from '../components/PrivateRoute'
// import AuthContext from '../context/AuthContext'
import Navbar from '../components/AppNavMenu'

import EventDetail from './EventDetail'
import Profile from './Profile'
import Event from './Event'
import Home from './Home'

const PrivatePage = () => (
  <div style={{
    backgroundColor: '#F4F6F6',
    width: '100%',
    height: '100vh',
    display: 'block',
    overflowY: 'scroll',
  }}
  >
    <Navbar />
    <Switch>
      <PrivateRoute path="/event/:eventId" component={EventDetail} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/event" component={Event} />
      <PrivateRoute path="/" component={Home} />
    </Switch>
  </div>
)

export default PrivatePage
