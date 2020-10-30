import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useMutation } from '@apollo/react-hooks'
import {
  makeStyles,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  MenuItem,
  Paper,
} from '@material-ui/core'

import createUserMutaion from '../graphql/mutations/createUser'

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    {new Date().getFullYear()}{' '}
    <Link color="inherit" href="https://material-ui.com/">
      Thaidotrun Co. Ltd.
    </Link>
  </Typography>
)

const gendertype = [
  {
    value: 'male',
    label: 'ชาย',
  },
  {
    value: 'female',
    label: 'หญิง',
  },

]
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
    marginTop: theme.spacing(3),
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

function Register(props) {
  const { history } = props
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [someDate, setBirthDate] = useState('')
  const [createUser] = useMutation(createUserMutaion)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (password !== password2) {
        alert("Passwords don't match")
      } else {
        const birthDate = moment(someDate, 'YYYY/MM/DD')
        const { data } = await createUser({
          variables: {
            email, password, name, gender, birthDate,
          },
        })
        console.log(data)
        if (data) {
          history.push('/')
        } else {
          console.log('err')
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <body>
        <Grid item sm={12}>
          <Paper className={classes.paper}>
            <Avatar src="https://sv1.picz.in.th/images/2020/10/24/b3T3lN.png" className={classes.avatar} />
            <Typography variant="h5" className={classes.title}>ParkrunThailand</Typography>
            <Typography variant="h6" className={classes.h6}>สมัครสมาชิก</Typography>
            <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    autoComplete="fname"
                    name="userName"
                    variant="outlined"
                    required
                    fullWidth
                    id="userName"
                    label="ชื่อ-นามสกุล"
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    InputProps={{
                      className: classes.borderinput,
                    }}
                    InputLabelProps={{
                      style: { color: '#2E7672' },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className={classes.input}
                    id="outlined-select-gender"
                    select
                    label="เพศ"
                    required
                    fullWidth
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      className: classes.borderinput,
                    }}
                    InputLabelProps={{
                      style: { color: '#2E7672' },
                    }}
                  >
                    {gendertype.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className={classes.input}
                    type="date"
                    fullWidth
                    variant="outlined"
                    disableFuture
                    id="birthday"
                    required
                    onChange={(e) => setBirthDate(e.target.value)}
                    InputProps={{
                      className: classes.borderinput,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="อีเมล"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    InputProps={{
                      className: classes.borderinput,
                    }}
                    InputLabelProps={{
                      style: { color: '#2E7672' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="รหัสผ่าน"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    InputProps={{
                      className: classes.borderinput,
                    }}
                    InputLabelProps={{
                      style: { color: '#2E7672' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="ยืนยันรหัสผ่าน"
                    type="password"
                    id="confirmPassword"
                    onChange={(e) => setPassword2(e.target.value)}
                    autoComplete="current-password"
                    InputProps={{
                      className: classes.borderinput,
                    }}
                    InputLabelProps={{
                      style: { color: '#2E7672' },
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                ลงทะเบียน
              </Button>
            </form>
          </Paper>
        </Grid>

        <Box mt={5}>
          <Copyright />
        </Box>
      </body>
    </Container>
  )
}
Register.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape(),
}
Register.defaultProps = {
  history: {},
}

export default Register
