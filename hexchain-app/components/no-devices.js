import { Block } from 'baseui/block'
import { Display } from 'baseui/typography'

export default () => {
  return (
    <Block
      marginLeft="32px"
      marginRight="32px"
      paddingTop="32px"
      paddingBottom="24px"
      overrides={{ Block: { style: { textAlign: 'center' } } }}
    >
      <Block overrides={{ Block: { style: { textAlign: 'center' } } }}>
        <img
          style={{ display: 'inline-block' }}
          width="300px"
          src="/static/svg/devices-icon.svg"
        />
      </Block>
      <Display overrides={{ Block: { style: { fontSize: '24px' } } }}>
        No devices yet.
      </Display>
    </Block>
  )
}
