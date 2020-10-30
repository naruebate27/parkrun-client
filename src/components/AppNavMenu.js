import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Container,
  IconButton,
  Link,
} from '@material-ui/core'

import AuthContext from '../context/AuthContext'

const useStyles = makeStyles((theme) => ({
  navButton: {
    marginRight: theme.spacing(1),
  },
  navIcon: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  navTitle: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing('canter'),
  },
  grow: {
    flexGrow: 1,
  },
}))
const AppNavMenu = (props) => {
  const classes = useStyles()
  const { title } = props
  const { user, removeToken } = useContext(AuthContext)

  return (
    <AppBar position="static" color="inherit">
      <Container>
        <Toolbar>
          <IconButton edge="start" className={classes.navButton} color="inherit" aria-label="menu">
            <Avatar src="https://sv1.picz.in.th/images/2020/10/24/b3T3lN.png" className={classes.navIcon} />
          </IconButton>
          <Typography variant="h6" className={classes.navTitle}>
            {title}
          </Typography>
          <Typography component="div" className={classes.grow}>
            <Button color="inherit"><Link href="/" color="inherit" underline="none">หน้าหลัก</Link></Button>
            <Button color="inherit"><Link href="/event" color="inherit" underline="none">งานวิ่ง</Link></Button>
            <Button color="inherit"><Link href="/profile" color="inherit" underline="none">โปรไฟล์</Link></Button>

          </Typography>
          {user && (
            <>
              <p>{user.email}</p>
              <Button variant="contained" color="inherit" underline="none" onClick={removeToken}>ออกจากระบบ</Button>
            </>
          )}
          {!user && (
            <>
              <Button color="inherit"><Link href="/login" color="inherit" underline="none">เข้าสู่ระบบ</Link></Button>
              <Button variant="contained"><Link href="/signUp" color="inherit" underline="none">สมัครสมาชิก</Link></Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

AppNavMenu.propTypes = {
  title: PropTypes.string.isRequired,
}

export default AppNavMenu
