import React from 'react'
import { Link, Typography } from '@material-ui/core'

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright ©'}
    {new Date().getFullYear()}{' '}
    <Link color="inherit" href="https://www.thai.run/">
      Thaidotrun Co. Ltd
    </Link>
  </Typography>
)

export default Copyright
