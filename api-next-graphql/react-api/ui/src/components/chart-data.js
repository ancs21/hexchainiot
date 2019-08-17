import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { format } from 'date-fns'

import { useQuery } from '@apollo/react-hooks'
import { HISTORY_DATA_BLOCKCHAIN_BY_ADDRESS } from '../shared/graphq'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'

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
export default ({ deviceById }) => {
  const classes = useStyles()
  const theme = useTheme()

  const [last, setLast] = React.useState(10)
  const { loading, error, data } = useQuery(
    HISTORY_DATA_BLOCKCHAIN_BY_ADDRESS,
    {
      variables: {
        address: deviceById.address,
        last: parseInt(last)
      },
      pollInterval: 1000
    }
  )
  if (loading) return <p>Loading...</p>
  if (error) return <p />
  const dataRes =
    data && data.historyDataOnBlockchainByAddress
      ? data.historyDataOnBlockchainByAddress
      : []

  if (!dataRes.length) return <p />

  return (
    <>
      <Grid item xs={12} sm={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="button">Dữ liệu lịch sử</Typography>
          <div>
            <NativeSelect
              value={last}
              onChange={e => setLast(e.target.value)}
              input={<Input name="last" id="age-native-label-placeholder" />}
            >
              <option value={10}>10 dữ liệu gần nhất</option>
              <option value={30}>30 dữ liệu gần nhất</option>
              <option value={60}>60 dữ liệu gần nhất</option>
            </NativeSelect>
            <FormHelperText>Chọn để truy vấn lịch sử</FormHelperText>
          </div>
        </Box>
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
          </Box>
          <ResponsiveContainer width="99%" height={289}>
            <LineChart
              data={dataRes}
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
              <XAxis
                dataKey="timestamp"
                tickFormatter={tickItem =>
                  format(new Date(parseInt(tickItem)), 'HH:mm:ss')
                }
              />
              <YAxis axisLine={false} />
              <Tooltip
                labelFormatter={name =>
                  format(new Date(parseInt(name)), 'yyyy-MM-dd HH:mm:ss')
                }
              />
              <Line
                type="monotone"
                dataKey="temp"
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
              Cảm biến pH
            </Typography>
          </Box>
          <ResponsiveContainer width="99%" height={289}>
            <LineChart
              data={dataRes}
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
              <XAxis
                dataKey="timestamp"
                tickFormatter={tickItem =>
                  format(new Date(parseInt(tickItem)), 'HH:mm:ss')
                }
              />
              <YAxis axisLine={false} />
              <Tooltip
                labelFormatter={name =>
                  format(new Date(parseInt(name)), 'yyyy-MM-dd HH:mm:ss')
                }
              />
              <Line
                type="monotone"
                dataKey="ph"
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
              Cảm biến Oxy hòa tan
            </Typography>
          </Box>
          <ResponsiveContainer width="99%" height={289}>
            <LineChart
              data={dataRes}
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
              <XAxis
                dataKey="timestamp"
                tickFormatter={tickItem =>
                  format(new Date(parseInt(tickItem)), 'HH:mm:ss')
                }
              />
              <YAxis axisLine={false} />
              <Tooltip
                labelFormatter={name =>
                  format(new Date(parseInt(name)), 'yyyy-MM-dd HH:mm:ss')
                }
              />
              <Line
                type="monotone"
                dataKey="oxy"
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
              Dung lượng Pin
            </Typography>
          </Box>
          <ResponsiveContainer width="99%" height={289}>
            <LineChart
              data={dataRes}
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
              <XAxis
                dataKey="timestamp"
                tickFormatter={tickItem =>
                  format(new Date(parseInt(tickItem)), 'HH:mm:ss')
                }
              />
              <YAxis axisLine={false} />
              <Tooltip
                labelFormatter={name =>
                  format(new Date(parseInt(name)), 'yyyy-MM-dd HH:mm:ss')
                }
              />
              <Line
                type="monotone"
                dataKey="pin"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </>
  )
}
