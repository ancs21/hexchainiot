import { Block } from 'baseui/block'
import Header from '../components/header'
import NoDevices from '../components/no-devices'
import { Label1, Paragraph2, Label2, Paragraph1 } from 'baseui/typography'
import { Button } from 'baseui/button'
import { Avatar } from 'baseui/avatar'
import Link from 'next/link'

export default () => {
  return (
    <>
      <Block backgroundColor="#fff">
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
              style: {
                // borderBottom: '1px solid #cdcdcd'
              }
            }
          }}
        >
          <Link href="#">
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
          <Label1
            paddingTop="16px"
            paddingBottom="16px"
            paddingLeft="12px"
            paddingRight="12px"
          >
            HISTORY DATA
          </Label1>
        </Block>
      </Block>
    </>
  )
}
