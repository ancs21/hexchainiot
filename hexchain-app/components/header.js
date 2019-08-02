import { Block } from 'baseui/block'
import { StatefulPopover } from 'baseui/popover'
import { Avatar } from 'baseui/avatar'
import { Paragraph1, Paragraph2, Label2 } from 'baseui/typography'
import { Button } from 'baseui/button'
import { StatefulMenu } from 'baseui/menu'
import { Modal, ModalHeader, ModalBody } from 'baseui/modal'

import AddDevice from './add-device'

export default () => {
  const [open, setOpen] = React.useState(false)
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
              <Block display="flex" alignItems="center">
                <Block marginRight="24px">
                  <Avatar size="64px" name="Hello" />
                </Block>
                <Block display="flex" flexDirection="column">
                  <Label2
                    marginBottom="8px"
                    overrides={{ Block: { style: { fontSize: '24px' } } }}
                  >
                    Welcome, Ryan
                  </Label2>
                  <Paragraph1 as="code">admin@hexchain.xyz</Paragraph1>
                </Block>
              </Block>
            </Block>
            <Block>
              <Button size="compact" onClick={() => setOpen(!open)}>
                ADD DEVICE
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>

      <AddDevice open={open} setOpen={setOpen} />
    </>
  )
}
