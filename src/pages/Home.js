import React, { Fragment } from 'react'
import {
  makeStyles,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  InputBase,
  fade,
  // Link,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import AppFooter from '../components/Footer'

const useStyles = makeStyles((theme) => ({
  bgSearchImage: {
    height: '300px',
    width: 'auto',
    // backgroundImage: `url(${'https://www.shutterstock.com/th/blog/wp-content/uploads/sites/16/2020/10/scene2.jpg'})`,
    backgroundColor: '#20B2AA',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  searchBox: {
    position: 'relative',
    top: '50%',
    transform: 'translate(0, -50%)',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.75),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.85),
    },
    margin: 'auto',
    width: '80%',
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(3),
    //   width: 'auto',
    // },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    // [theme.breakpoints.up('md')]: {
    //   width: '20ch',
    // },
  },
  md: {
    margin: theme.spacing(1),
    color: '#fff',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  card: {
    height: 450,
  },

}))

const IndexPage = () => {
  const classes = useStyles()
  return (
    <Fragment>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* -------------------------------------------------------- */}
          <Grid item xs={12} md={12}>
            <div className={classes.bgSearchImage}>
              <div className={classes.searchBox}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="กรุณาระบุจังหวัดที่คุณต้องการ..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </div>
          </Grid>
          {/* -------------------------------------------------------- */}
          <Grid item sm={12} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography align="center" variant="h5">Parkrun คืออะไร</Typography><br />
                <img className={classes.img} alt="complex" src="https://images.parkrun.com/website/uk/country_home_left.jpg" /><br />
                <Typography>parkruns เป็นเว็บไซต์ลงทะเบียนงานวิ่งฟรีที่จัดขึ้นทุกสัปดาห์ทั่วประเทศ</Typography><br />
                <Typography>กิจกรรม Parkrun มีระยะทางเริ่มต้น 3 กม. (ไม่เกิน 5 กม.) และจัดขึ้นในสวนสาธารณะและพื้นที่เปิดโล่ง </Typography><br />
                <Typography>parkrun เป็นประสบการณ์ที่ดีสามารถเข้าร่วมวิ่งได้ทุกคน ทุกเพศ และทุกวัย สามารถมีส่วนร่วมในกิจกรรมในฐานะที่เป็นนักวิ่งหรืออาสาสมัครได้</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography align="center" variant="h5">ฉันจะเข้าร่วมได้อย่างไร</Typography><br />
                <img className={classes.img} alt="complex" src="https://images.parkrun.com/website/uk/country_home_middle.jpg" /><br />
                <Typography>การลงทะเบียนไม่มีค่าใช้จ่ายใดๆ เพียงลงทะเบียนกับ parkrun เพียงครั้งเดียว ก็ได้ QRcode ที่สามารถเข้าร่วมกิจกรรมได้ทุกที่ในพื้นที่ของคุณ</Typography><br />
                <Typography>มี parkrun มากมายที่จัดขึ้นทั่วประเทศให้เลือก คุณสามารถค้นหา parkrun ที่ใกล้ที่สุดได้โดยใช้แผนที่ของเรา</Typography><br />
                <Typography>เราอยากพบคุณเร็ว ๆ นี้!</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography align="center" variant="h5">เป็นส่วนหนึ่งกับงานวิ่งของเรา</Typography><br />
                <img className={classes.img} alt="complex" src="https://images.parkrun.com/website/uk/country_home_right.jpg" /><br />
                <Typography>มีหลายเหตุผลที่จะเข้าร่วม!</Typography><br />
                <Typography>ไม่ว่าคุณเป็นนักวิ่ง เป็นอาสาสมัครหรือผู้ชม คุณสามารถเรียนรู้ทักษะใหม่ ๆ และเสริมสร้างสุขภาพและความสุขของคุณในกิจกรรมกลางแจ้งที่ยิ่งใหญ่ คุณจะรู้สึกเป็นส่วนหนึ่งของชุมชนของเรา</Typography><br />
                <Typography>ยังไม่มั่นใจ ? ดูเรื่องราวสร้างแรงบันดาลใจมากมายจาก parkrunners ในบล็อกของเราสิ</Typography>
              </CardContent>
            </Card>
          </Grid>
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
          {/* -------------------------------------------------------- */}
        </Grid>
      </Container>
      <AppFooter description="803, 805, 807, 809 โครงการ stadium One ซอย จุฬาลงกรณ์ 4 ถนน บรรทัดทอง แขวง วังใหม่ เขต ปทุมวัน กรุงเทพฯ 10330" />
    </Fragment>
  )
}

export default IndexPage
