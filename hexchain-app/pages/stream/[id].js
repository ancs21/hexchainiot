import React from 'react'
import { Block } from 'baseui/block'

import {
  Label1,
  Paragraph2,
  Label2,
  Paragraph1,
  Display
} from 'baseui/typography'
import { Button } from 'baseui/button'
import Link from 'next/link'
import { formatDistance } from 'date-fns'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
  // Legend,
  // Brush,
  // AreaChart,
  // Area
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

const deepstream = require('deepstream.io-client-js')

const ds = deepstream('ws://35.247.190.52:6020/deepstream', {
  silentDeprecation: true
})

const DeviceStream = ({ query: { id, address } }) => {
  const [data1, setData] = React.useState(null)
  const [listData, setListData] = React.useState([])
  ds.login({
    username: 'spiderman',
    password: 'farfromhome'
  })

  React.useEffect(() => {
    ds.event.subscribe(`data/${address}`, function(eventData) {
      const { value } = eventData
      setData(value)
    })
    return () => {
      try {
        ds.event.unlisten('data/*')
      } catch (e) {}
    }
  }, [])

  React.useEffect(() => {
    if (data1 !== null) {
      if (listData.length > 10) {
        listData.shift()
      }
      return setListData(listData.concat(data1))
    }
  }, [data1])

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
                      borderBottom: `2px solid #ffc107`
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
                      ':hover': {
                        color: '#ffc107'
                      }
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

      {listData.length > 0 ? (
        <Block maxWidth="1070px" margin="24px auto">
          <Block display="flex" justifyContent="center" marginBottom="24px">
            <Block
              backgroundColor="#fff"
              flex="1"
              overrides={{
                Block: {
                  style: ({ $theme }) => ({
                    textAlign: 'center',
                    borderRadius: '8px',
                    boxShadow: $theme.lighting.shadow400
                  })
                }
              }}
            >
              <Label2
                paddingTop="16px"
                paddingBottom="16px"
                paddingLeft="24px"
                paddingRight="24px"
                overrides={{
                  Block: {
                    style: {
                      textAign: 'left',
                      borderBottom: '1px solid #F0F0F0'
                    }
                  }
                }}
              >
                {'Current Temperature (°C)'.toUpperCase()}
              </Label2>
              <Block textAlign="center">
                <Display
                  paddingTop="16px"
                  overrides={{
                    Block: {
                      style: {
                        textAlign: 'center'
                      }
                    }
                  }}
                >
                  {listData.length > 0 ? (
                    listData[listData.length - 1].temp
                  ) : (
                    <Label2
                      overrides={{
                        Block: {
                          style: {
                            textAlign: 'center'
                          }
                        }
                      }}
                    >
                      No data
                    </Label2>
                  )}
                </Display>
                <Paragraph2
                  overrides={{
                    Block: {
                      style: {
                        textAlign: 'center'
                      }
                    }
                  }}
                  paddingBottom="24px"
                >
                  {listData.length > 0 &&
                    formatDistance(
                      listData[listData.length - 1].timestamp,
                      new Date()
                    )}
                </Paragraph2>
              </Block>
            </Block>
            <Block
              marginLeft="24px"
              flex="2"
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
                  width={680}
                  height={200}
                  data={listData}
                  syncId="anyId"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid strokeDasharray="5 5" />
                  <XAxis dataKey="timestamp" />
                  <YAxis axisLine={false} domain="uv" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </LineChart>
              </Block>
            </Block>
          </Block>

          <Block display="flex" justifyContent="center">
            <Block
              backgroundColor="#fff"
              flex="1"
              overrides={{
                Block: {
                  style: ({ $theme }) => ({
                    textAlign: 'center',
                    borderRadius: '8px',
                    boxShadow: $theme.lighting.shadow400
                  })
                }
              }}
            >
              <Label2
                paddingTop="16px"
                paddingBottom="16px"
                paddingLeft="24px"
                paddingRight="24px"
                overrides={{
                  Block: {
                    style: {
                      textAign: 'left',
                      borderBottom: '1px solid #F0F0F0'
                    }
                  }
                }}
              >
                {'Current Temperature (°C)'.toUpperCase()}
              </Label2>
              <Block textAlign="center">
                <Display
                  paddingTop="16px"
                  overrides={{
                    Block: {
                      style: {
                        textAlign: 'center'
                      }
                    }
                  }}
                >
                  24
                </Display>
                <Paragraph2
                  overrides={{
                    Block: {
                      style: {
                        textAlign: 'center'
                      }
                    }
                  }}
                  paddingBottom="24px"
                >
                  5 minutes ago
                </Paragraph2>
              </Block>
            </Block>
            <Block
              marginLeft="24px"
              flex="2"
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
                  width={680}
                  height={200}
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
      ) : (
        <Display>No stream data</Display>
      )}
    </>
  )
}

DeviceStream.getInitialProps = async ({ query }) => {
  return { query }
}

export default DeviceStream
