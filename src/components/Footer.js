import React from 'react'
import PropTypes from 'prop-types'
import {
  // Link,
  Container,
  Typography,
  Grid,
  makeStyles,
} from '@material-ui/core'

import Copyright from './Copyright'

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(4, 0),
    backgroundColor: '#FFFFFF',
  },
}))

const AppFooter = (props) => {
  const classes = useStyles()
  const { description, title } = props

  return (
    <Grid item xs={12} md={12}>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" align="center" color="#000000" component="p">
            {description}
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </Grid>

  )
}

AppFooter.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default AppFooter
