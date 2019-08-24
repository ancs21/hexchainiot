import gql from 'graphql-tag'

export const MY_DEVICES = gql`
  query myDevices {
    devices {
      id
      name
      description
      address
      created_at
    }
  }
`

export const ADD_DEVICE = gql`
  mutation add_device($name: String, $description: String) {
    add_device(name: $name, description: $description) {
      id
      name
      description
      address
      created_at
    }
  }
`

export const STATE_BY_ADDRESS = gql`
  query stateByaddress($address: String) {
    stateByAddress(address: $address) {
      data
    }
  }
`

export const DEVICE_BY_ID = gql`
  query deviceById($deviceId: String) {
    deviceById(deviceId: $deviceId) {
      id
      created_at
      name
      description
      address
    }
    deviceSendData(deviceId: $deviceId)
  }
`

export const HISTORY_DATA_BLOCKCHAIN_BY_ADDRESS = gql`
  query historyDataOnBlockchainByAddress($address: String, $last: Int) {
    historyDataOnBlockchainByAddress(address: $address, last: $last) {
      timestamp
      temp
      ph
      pin
      oxy
    }
  }
`

export const HISTORY_BY_TIMESTAMP = gql`
  query historyByTimestamp(
    $address: String
    $startDate: String
    $endDate: String
  ) {
    historyByTimestamp(
      address: $address
      startDate: $startDate
      endDate: $endDate
    ) {
      timestamp
      temp
      ph
      pin
      oxy
    }
  }
`
