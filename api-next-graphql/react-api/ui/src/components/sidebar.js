import React from 'react'

import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import AddDevice from '../components/add-device'
import ListDevices from '../components/list-data'

const drawerWidth = 340

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

export default ({ container, handleDrawerToggle, mobileOpen, idSelect }) => {
  const classes = useStyles()
  const theme = useTheme()

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <img width="45" src="/static/logo.png" alt="logo" />
      </div>
      <Divider />
      <Typography
        variant="button"
        display="block"
        className={classes.textListDevice}
      >
        Danh sách thiết bị
      </Typography>
      <Divider />
      <Divider />

      <ListDevices idSelect={idSelect} />
      <AddDevice />
    </div>
  )

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
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
            keepMounted: true
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
  )
}
