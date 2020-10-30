import React, { useContext } from 'react'

// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// import AppNavMenu from './components/AppNavMenu'
import LoginPage from './components/Login'

import PrivatePage from './pages/PrivatePage'
import AuthContext from './context/AuthContext'


const App = () => {
  const { user } = useContext(AuthContext)
  // console.log(user)
  if (user) {
    return (<PrivatePage />)
  }
  return (<LoginPage />)
}

export default App
