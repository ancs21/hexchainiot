import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { useQuery } from '@apollo/react-hooks'
import CardData from '../components/card-data'
import Sidebar from '../components/sidebar'
import ChartData from '../components/chart-data'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Popper from '@material-ui/core/Popper'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles'
import { DEVICE_BY_ID } from '../shared/graphq'

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

function Device(props) {
  const { container } = props
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(prev => (prev ? null : event.currentTarget))
  }

  const open = Boolean(anchorEl)
  const id = open ? 'no-transition-popper' : undefined

  const { loading, error, data } = useQuery(DEVICE_BY_ID, {
    variables: {
      deviceId: props.id
    }
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  const deviceById = data ? data.deviceById : null
  const snippet = data ? data.deviceSendData : null
  if (!deviceById) return <p>No device exist</p>

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
          <Box display="flex">
            <Typography variant="h6">{deviceById.name}</Typography>
            <div style={{ marginLeft: '50px' }}>
              <Button
                aria-describedby={id}
                variant="contained"
                color="default"
                onClick={handleClick}
              >
                Lấy snippet
              </Button>
              <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                style={{ zIndex: 12345 }}
              >
                <Paper>
                  <Typography
                    className={classes.typography}
                    style={{ width: '400px' }}
                  >
                    {snippet}
                  </Typography>
                </Paper>
              </Popper>
            </div>
          </Box>
        </Toolbar>
      </AppBar>

      <Sidebar
        idSelect={deviceById.id}
        container={container}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3}>
          <CardData deviceById={deviceById} />
          <ChartData deviceById={deviceById} />
        </Grid>
      </main>
    </div>
  )
}

export default Device
