import { Block } from 'baseui/block'
import Header from './header'
import NoDevices from './no-devices'
import { Button } from 'baseui/button'
import { Paragraph2, Label2, Label1 } from 'baseui/typography'
import Link from 'next/link'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'
const GET_DEVICES = gql`
  query GET_DEVICES {
    listdevices {
      id
      name
      created_at
      address
      address_blockchain
      description
      location
      updated_at
      userId
    }
  }
`

export default () => {
  return (
    <>
      <Header />
      <Block maxWidth="999px" margin="auto">
        <Query query={GET_DEVICES}>
          {({ data, loading, error }) => {
            if (loading) return 'Loading...'
            if (error) return error
            const listdevices = data ? data.listdevices : []
            if (listdevices.length === 0) return <NoDevices />

            return (
              <Block marginLeft="32px" marginRight="32px">
                <Block
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginTop="16px"
                  marginBottom="16px"
                >
                  <Label2>LIST DEVICES</Label2>
                  <Button size="compact" kind="tertiary">
                    View in map
                  </Button>
                </Block>
                <Block
                  backgroundColor="white"
                  display="flex"
                  justifyContent="space-between"
                  paddingTop="16px"
                  paddingBottom="16px"
                  paddingLeft="12px"
                  paddingRight="12px"
                  overrides={{
                    Block: {
                      style: {
                        borderTop: '1px solid #cdcdcd',
                        borderBottom: '1px solid #cdcdcd',
                        textAlign: 'left'
                      }
                    }
                  }}
                >
                  <Label1 width="25%">NAME</Label1>
                  <Label1 width="25%">DESCRIPTION</Label1>
                  <Label1 width="25%">CREATED AT</Label1>
                  <Label1 width="25%">STATUS</Label1>
                </Block>
                {listdevices.map(v => (
                  <Link
                    href={`/stream/${v.id}?address=${v.address_blockchain}`}
                  >
                    <a style={{ textDecoration: 'none' }}>
                      <Block
                        backgroundColor="white"
                        display="flex"
                        justifyContent="space-between"
                        padding="16px 12px"
                        overrides={{
                          Block: {
                            style: {
                              ':hover': {
                                backgroundColor: '#fafafa',
                                cursor: 'pointer'
                              },
                              borderBottom: '1px solid #cdcdcd'
                            }
                          }
                        }}
                      >
                        <Paragraph2 as="span" width="25%">
                          {v.name}
                        </Paragraph2>
                        <Paragraph2 as="span" width="25%">
                          {v.description}
                        </Paragraph2>
                        <Paragraph2 as="span" width="25%">
                          {v.created_at}
                        </Paragraph2>

                        <Paragraph2 as="span" width="25%">
                          Not yet
                        </Paragraph2>
                      </Block>
                    </a>
                  </Link>
                ))}
              </Block>
            )
          }}
        </Query>
      </Block>
    </>
  )
}
