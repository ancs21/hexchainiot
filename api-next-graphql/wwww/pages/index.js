import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import Chip from '@material-ui/core/Chip'
import Fab from '@material-ui/core/Fab'

import AddDevice from '../components/add-device'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area
} from 'recharts'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  }
]

const drawerWidth = 345

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },

  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  paper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  textCard: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  box: {
    paddingRight: theme.spacing(2)
  },
  item: {
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  textListDevice: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1)
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2)
  }
}))

function Index(props) {
  const { container } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        {/* <Button variant="outlined" color="primary" className={classes.button}>
          <AddIcon className={classes.extendedIcon} />
          Thêm thiết bị
        </Button> */}
        <img width="45" src="/static/logo.png" />
      </div>

      <Divider />
      <Typography
        variant="button"
        display="block"
        className={classes.textListDevice}
      >
        Danh sách thiết bị
      </Typography>
      {/* <List>
       
          <ListItem button>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        
      </List> */}
      <Divider />
      <Divider />
      <List style={{ paddingTop: 0 }}>
        <ListItem button={true}>
          <Box className={classes.item}>
            <ListItemText
              primary="Libelium smart water 001"
              secondary="July 20, 2014"
            />
            <Typography variant="caption">
              Giám sát môi trường nước tại khu công nghiệp
            </Typography>
          </Box>
        </ListItem>
        <Divider />
      </List>

      <AddDevice />
    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography gutterBottom>Nhiệt độ</Typography>
                <Typography variant="h3" component="h2">
                  <img width="48" src="/static/icons/temp.png" /> 28 °C
                </Typography>
                <Typography color="textSecondary" style={{ marginTop: '10px' }}>
                  Cập nhật 5 phút trước
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography gutterBottom>Nhiệt độ</Typography>
                <Typography variant="h3" component="h2">
                  <img width="48" src="/static/icons/temp.png" /> 28 °C
                </Typography>
                <Typography color="textSecondary" style={{ marginTop: '10px' }}>
                  Cập nhật 5 phút trước
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography gutterBottom>Nhiệt độ</Typography>
                <Typography variant="h3" component="h2">
                  <img width="48" src="/static/icons/temp.png" /> 28 °C
                </Typography>
                <Typography color="textSecondary" style={{ marginTop: '10px' }}>
                  Cập nhật 5 phút trước
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography gutterBottom>Nhiệt độ</Typography>
                <Typography variant="h3" component="h2">
                  <img width="48" src="/static/icons/temp.png" /> 28 °C
                </Typography>
                <Typography color="textSecondary" style={{ marginTop: '10px' }}>
                  Cập nhật 5 phút trước
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              <Box
                display="flex"
                justifyContent="space-between"
                className={classes.box}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  gutterBottom
                  className={classes.textCard}
                >
                  Nhiệt độ
                </Typography>
                <div>
                  <NativeSelect
                    // value={state.age}
                    // onChange={handleChange('age')}
                    input={
                      <Input name="age" id="age-native-label-placeholder" />
                    }
                  >
                    <option value="">Dữ liệu gần nhất</option>
                    <option value={10}>1 ngày</option>
                    <option value={20}>7 ngày</option>
                  </NativeSelect>
                  <FormHelperText>Chọn để truy vấn lịch sử</FormHelperText>
                </div>
              </Box>
              <ResponsiveContainer width="99%" height={289}>
                <LineChart
                  data={data}
                  syncId="anyId"
                  fill={theme.palette.primary.main}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis axisLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              <Box
                display="flex"
                justifyContent="space-between"
                className={classes.box}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  gutterBottom
                  className={classes.textCard}
                >
                  Nhiệt độ
                </Typography>
                <div>
                  <NativeSelect
                    // value={state.age}
                    // onChange={handleChange('age')}
                    input={
                      <Input name="age" id="age-native-label-placeholder" />
                    }
                  >
                    <option value="">Dữ liệu gần nhất</option>
                    <option value={10}>1 ngày</option>
                    <option value={20}>7 ngày</option>
                  </NativeSelect>
                  <FormHelperText>Chọn để truy vấn lịch sử</FormHelperText>
                </div>
              </Box>
              <ResponsiveContainer width="99%" height={289}>
                <LineChart
                  data={data}
                  syncId="anyId"
                  fill={theme.palette.primary.main}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis axisLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              <Box
                display="flex"
                justifyContent="space-between"
                className={classes.box}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  gutterBottom
                  className={classes.textCard}
                >
                  Nhiệt độ
                </Typography>
                <div>
                  <NativeSelect
                    // value={state.age}
                    // onChange={handleChange('age')}
                    input={
                      <Input name="age" id="age-native-label-placeholder" />
                    }
                  >
                    <option value="">Dữ liệu gần nhất</option>
                    <option value={10}>1 ngày</option>
                    <option value={20}>7 ngày</option>
                  </NativeSelect>
                  <FormHelperText>Chọn để truy vấn lịch sử</FormHelperText>
                </div>
              </Box>
              <ResponsiveContainer width="99%" height={289}>
                <LineChart
                  data={data}
                  syncId="anyId"
                  fill={theme.palette.primary.main}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis axisLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              <Box
                display="flex"
                justifyContent="space-between"
                className={classes.box}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  gutterBottom
                  className={classes.textCard}
                >
                  Nhiệt độ
                </Typography>
                <div>
                  <NativeSelect
                    // value={state.age}
                    // onChange={handleChange('age')}
                    input={
                      <Input name="age" id="age-native-label-placeholder" />
                    }
                  >
                    <option value="">Dữ liệu gần nhất</option>
                    <option value={10}>1 ngày</option>
                    <option value={20}>7 ngày</option>
                  </NativeSelect>
                  <FormHelperText>Chọn để truy vấn lịch sử</FormHelperText>
                </div>
              </Box>
              <ResponsiveContainer width="99%" height={289}>
                <LineChart
                  data={data}
                  syncId="anyId"
                  fill={theme.palette.primary.main}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis axisLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export default Index
