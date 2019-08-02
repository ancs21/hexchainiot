import { StatefulDatepicker } from 'baseui/datepicker'
import { Block } from 'baseui/block'
import { addDays } from 'date-fns'
import {
  Label1,
  Paragraph2,
  Label2,
  Paragraph1,
  Display
} from 'baseui/typography'
import { Button } from 'baseui/button'
import { Avatar } from 'baseui/avatar'
import Link from 'next/link'
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
  }
]

const DeviceStream = ({ query: { id } }) => {
  return (
    <>
      <Block
        backgroundColor="#fff"
        overrides={{
          Block: {
            style: ({ $theme }) => ({
              // borderBottom: `1px solid $theme.lighting.shadow400`
              boxShadow: $theme.lighting.shadow400
            })
          }
        }}
      >
        <Block maxWidth="999px" margin="auto">
          <Block
            display="flex"
            justifyContent="center"
            marginLeft="32px"
            marginRight="32px"
            paddingTop="16px"
            paddingBottom="16px"
          >
            <Block>
              <img alt="logo" src="/static/images/logo.svg" />
            </Block>
          </Block>
        </Block>
        <Block maxWidth="999px" margin="24px auto">
          <Block
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginLeft="32px"
            marginRight="32px"
            paddingTop="16px"
            paddingBottom="16px"
          >
            <Block>
              <Block>
                <Block overrides={{ Block: { style: { textAlign: 'left' } } }}>
                  <Label2
                    marginBottom="8px"
                    overrides={{ Block: { style: { fontSize: '24px' } } }}
                  >
                    Hexchain-0001
                  </Label2>
                  <Paragraph1 as="p">
                    This is sensto data monitoring temperature and humidity
                  </Paragraph1>
                </Block>
              </Block>
            </Block>
            <Block>
              <Button>ADD DEVICE</Button>
            </Block>
          </Block>
        </Block>
        <Block
          maxWidth="999px"
          margin="24px auto"
          backgroundColor="white"
          display="flex"
          justifyContent="center"
          overrides={{
            Block: {
              style: ({ $theme }) => ({
                // borderBottom: `1px solid $theme.lighting.shadow400`
                // boxShadow: $theme.lighting.shadow400
              })
            }
          }}
        >
          <Link href="/stream/1">
            <a style={{ textDecoration: 'none' }}>
              <Label1
                paddingTop="16px"
                paddingBottom="16px"
                paddingLeft="12px"
                paddingRight="12px"
                overrides={{
                  Block: {
                    style: {
                      ':hover': {
                        color: '#ffc107'
                      }
                    }
                  }
                }}
              >
                STREAM
              </Label1>
            </a>
          </Link>
          <Link href="/history/1">
            <a style={{ textDecoration: 'none' }}>
              <Label1
                paddingTop="16px"
                paddingBottom="16px"
                paddingLeft="12px"
                paddingRight="12px"
                overrides={{
                  Block: {
                    style: {
                      borderBottom: `2px solid #ffc107`
                    }
                  }
                }}
              >
                HISTORY DATA
              </Label1>
            </a>
          </Link>
        </Block>
      </Block>

      <Block maxWidth="1070px" margin="24px auto">
        <Block
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="24px"
        >
          <Label2>HISTORY DATA</Label2>
          <Block display="flex" justifyContent="space-around">
            <Button size="compact" kind="secondary">
              1 hour
            </Button>
            <Button size="compact" kind="minimal">
              6 hours
            </Button>
            <Button size="compact" kind="minimal">
              12 hours
            </Button>
            <Button size="compact" kind="minimal">
              1 day
            </Button>
            <Button size="compact" kind="minimal">
              7 days
            </Button>
            <Button size="compact" kind="minimal">
              14 days
            </Button>
            <Button size="compact" kind="minimal">
              30 days
            </Button>
            <Block>
              <StatefulDatepicker
                range
                initialState={{ value: [new Date(), addDays(new Date(), 4)] }}
                placeholder="YYYY/MM/YY - YYYY/MM/YY"
              />
            </Block>
          </Block>
        </Block>
        <Block display="flex" justifyContent="center" marginBottom="24px">
          <Block
            marginLeft="24px"
            flex="1"
            width="100%"
            backgroundColor="#fff"
            overrides={{
              Block: {
                style: ({ $theme }) => ({
                  fontSize: '16px',
                  textAlign: 'center',
                  borderRadius: '8px',
                  boxShadow: $theme.lighting.shadow400
                })
              }
            }}
          >
            <Block flex="2">
              <Label2
                overrides={{
                  Block: {
                    style: {
                      textAlign: 'center',
                      marginTop: '16px'
                    }
                  }
                }}
              >
                Last 10
              </Label2>
              <LineChart
                width={500}
                height={300}
                data={data}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis axisLine={false} domain="uv" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </LineChart>
            </Block>
          </Block>
          <Block
            marginLeft="24px"
            flex="1"
            width="100%"
            backgroundColor="#fff"
            overrides={{
              Block: {
                style: ({ $theme }) => ({
                  fontSize: '16px',
                  textAlign: 'center',
                  borderRadius: '8px',
                  boxShadow: $theme.lighting.shadow400
                })
              }
            }}
          >
            <Block flex="2">
              <Label2
                overrides={{
                  Block: {
                    style: {
                      textAlign: 'center',
                      marginTop: '16px'
                    }
                  }
                }}
              >
                Last 10
              </Label2>
              <LineChart
                width={500}
                height={300}
                data={data}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis axisLine={false} domain="uv" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </LineChart>
            </Block>
          </Block>
        </Block>
      </Block>
    </>
  )
}

DeviceStream.getInitialProps = async ({ query }) => {
  return { query }
}

export default DeviceStream
