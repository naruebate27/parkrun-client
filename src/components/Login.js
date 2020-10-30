import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'

import {
  makeStyles,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Link,
  Typography,
  Container,
  Box,
  Paper,
} from '@material-ui/core'

import AuthContext from '../context/AuthContext'
import loginMutation from '../graphql/mutations/login'

import Copyright from './Copyright'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    display: 'flex',
    borderRadius: '15px',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#20B2AA',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(30),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 12, 2),
    width: theme.spacing(20),
    height: theme.spacing(5),
    backgroundColor: '#fff',
  },
  title: {
    marginRight: theme.spacing(-9),
    marginTop: theme.spacing(-8),
    color: '#fff',
  },
  h6: {
    color: '#fff',
    marginRight: theme.spacing(3),
  },
  input: {
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#357B77',
      borderWidth: '2px',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#357B77',
    },
  },
  borderinput: {
    borderRadius: '5px',
    backgroundColor: '#fafafa !important',

  },
}))

const Login = (props) => {
  const { history } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useMutation(loginMutation)
  const { setToken } = useContext(AuthContext)
  const classes = useStyles()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await login({ variables: { email, password } })
      console.log(data.login.token)
      if (data) {
        setToken(data.login.token)
        history.push('/')
      } else {
        console.log('err')
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid item sm={12}>
        <Paper className={classes.paper}>
          <Avatar src="https://sv1.picz.in.th/images/2020/10/24/b3T3lN.png" className={classes.avatar} />
          <Typography variant="h5" className={classes.title}>ParkrunThailand</Typography>
          <Typography variant="h6" className={classes.h6}>เข้าสู่ระบบ</Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="อีเมล"
              name="email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              InputProps={{
                className: classes.borderinput,
              }}
              InputLabelProps={{
                style: { color: '#2E7672' },
              }}
            />
            <TextField
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              label="รหัสผ่าน"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                className: classes.borderinput,
              }}
              InputLabelProps={{
                style: { color: '#2E7672' },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              เข้าสู่ระบบ
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ลืมรหัสผ่าน
                </Link>
              </Grid>
              <Grid item>
                <Typography display="inline" variant="body3">
                  {'คุณยังไม่ได้ลงทะเบียน? '}
                  <Link href="/register" variant="body3">สมัครสมาชิก</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape(),
}
Login.defaultProps = {
  history: {},
}
export default withRouter(Login)
