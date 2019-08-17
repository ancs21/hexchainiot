import React from 'react'

import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import { Link } from '@reach/router'

import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import { MY_DEVICES } from '../shared/graphq'

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

export default ({ idSelect }) => {
  const classes = useStyles()

  const { loading, error, data } = useQuery(MY_DEVICES)
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  return (
    <List style={{ paddingTop: 0 }}>
      {data && data.devices && data.devices.length ? (
        data.devices.map(item => (
          <Link
            to={`/${item.id}`}
            key={item.id}
            style={{
              textDecoration: 'initial',
              color: 'initial',
              fontSize: 'initial'
            }}
          >
            <ListItem
              button={true}
              style={item.id === idSelect ? { background: '#eff3f6' } : null}
            >
              <Box className={classes.item}>
                <Typography variant="body1" style={{ marginTop: '6px' }}>
                  {item.name}
                </Typography>
                <ListItemText secondary={item.created_at} />
                <Typography variant="body2">{item.description}</Typography>
              </Box>
            </ListItem>
            <Divider />
          </Link>
        ))
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="50px"
        >
          <Box textAlign="center">
            <img width="200" src="/static/svg/no-device.svg" alt="no-device" />
            <Typography style={{ marginTop: '16px' }}>
              Không có thiết bị
            </Typography>
          </Box>
        </Box>
      )}
    </List>
  )
}
