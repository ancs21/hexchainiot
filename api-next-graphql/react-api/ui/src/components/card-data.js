import React from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

import { useQuery } from '@apollo/react-hooks'
import { STATE_BY_ADDRESS } from '../shared/graphq'

export default ({ deviceById }) => {
  const { loading, error, data } = useQuery(STATE_BY_ADDRESS, {
    variables: {
      address: deviceById.address
    },
    pollInterval: 1000
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  const dataRes =
    data && data.stateByAddress ? JSON.parse(data.stateByAddress.data) : null
  if (!dataRes) return <p>No data</p>

  return (
    <>
      <Grid item xs={6} sm={3}>
        <Card>
          <CardContent>
            <Typography gutterBottom>Cảm biến Nhiệt độ</Typography>
            <Typography variant="h3" component="h2">
              <img width="48" alt="icon" src="/static/icons/temp.png" />{' '}
              {dataRes.temp}{' '}
              <Typography variant="button" component="span">
                °C
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginTop: '10px' }}
            >
              Mới nhất{' '}
              {formatDistanceToNow(new Date(dataRes.timestamp), { locale: vi })}{' '}
              trước
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6} sm={3}>
        <Card>
          <CardContent>
            <Typography gutterBottom>Cảm biến pH</Typography>
            <Typography variant="h3" component="h2">
              <img width="48" alt="icon" src="/static/icons/ph-meter.png" />{' '}
              {dataRes.ph}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginTop: '10px' }}
            >
              Mới nhất{' '}
              {formatDistanceToNow(new Date(dataRes.timestamp), { locale: vi })}{' '}
              trước
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6} sm={3}>
        <Card>
          <CardContent>
            <Typography gutterBottom>Cảm biến Oxy hòa tan</Typography>
            <Typography variant="h3" component="h2">
              <img width="48" alt="icon" src="/static/icons/oxygen.png" />{' '}
              {dataRes.oxy}{' '}
              <Typography variant="button" component="span">
                PPM
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginTop: '10px' }}
            >
              Mới nhất{' '}
              {formatDistanceToNow(new Date(dataRes.timestamp), { locale: vi })}{' '}
              trước
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6} sm={3}>
        <Card>
          <CardContent>
            <Typography gutterBottom>Dung lượng Pin</Typography>
            <Typography variant="h3" component="h2">
              <img width="48" alt="icon" src="/static/icons/battery.png" />{' '}
              {dataRes.pin}{' '}
              <Typography variant="button" component="span">
                %
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginTop: '10px' }}
            >
              Mới nhất{' '}
              {formatDistanceToNow(new Date(dataRes.timestamp), { locale: vi })}{' '}
              trước
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}
