import React, { useContext, Fragment } from 'react'
import { useQuery } from 'react-apollo'
import {
  makeStyles,
  Container,
  Grid,
  Typography,
  // Card,
  // CardContent,
  // InputBase,
  // fade,
  CircularProgress,
} from '@material-ui/core'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
// import urlSlug from 'url-slug'
import { Link } from 'react-router-dom'

import AuthContext from '../context/AuthContext'
import getEvent from '../graphql/queries/getAllEvent'
import AppFooter from '../components/Footer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  md: {
    margin: theme.spacing(1),
  },
}))

const Event = () => {
  const classes = useStyles()
  const { user } = useContext(AuthContext)
  const { data = { eventMany: [] }, loading } = useQuery(getEvent, {
    variables: {
      userId: Number(user.id),
    },
  })
  console.log(data)
  return (
    <Fragment>
      <Container>
        <div className={classes.root}>

          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">All Events</ListSubheader>
            </GridListTile>

            {loading ? (
              <CircularProgress animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </CircularProgress>
            ) : (
              data.eventMany.map((item, index) => (
                <Link to={`/event/${item._id}`} key={index}>
                  <GridListTile item sm={12} md={4}>
                    <img src="https://cdn.discordapp.com/attachments/674198917734465536/766598498288009236/1552302926161.jpeg" alt={item.title} />
                    <GridListTileBar
                      title={item.name}
                      subtitle={<span>by: Thairun</span>}
                      actionIcon={(
                        <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                          <InfoIcon />
                        </IconButton>
                  )}
                    />
                  </GridListTile>
                </Link>
              )))}
          </GridList>
        </div>
        {/* -------------------------------------------------------- */}
        <Grid item md={12}>
          <Grid container item style={{ backgroundColor: '#20B2AA' }}>
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
      </Container>
      {/* -------------------------------------------------------- */}
      <AppFooter description="803, 805, 807, 809 โครงการ stadium One ซอย จุฬาลงกรณ์ 4 ถนน บรรทัดทอง แขวง วังใหม่ เขต ปทุมวัน กรุงเทพฯ 10330" />
    </Fragment>
  )
}

export default Event
