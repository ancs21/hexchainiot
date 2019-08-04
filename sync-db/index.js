require('dotenv').config()

const deepstream = require('deepstream.io-client-js')
const axios = require('axios')
const moment = require('moment-timezone')
const gql = require('graphql-tag')
const ds = deepstream(process.env.DEEPSTREAM_URL, {
  silentDeprecation: true
})

ds.login(
  {
    username: 'spiderman',
    password: 'farfromhome' // NEEDS TO BE REAL
  },
  function(success, data) {
    //success == true
    //data == { themeColor: 'pink' }
    console.log(data)
  }
)

ds.event.subscribe(
  'data/fc3c28982d4de5180ec771362c42de871c48cc8000aceeffcc53e88c6848cf643a6154',
  function(eventData) {
    console.log(eventData)

    axios
      .post(
        process.env.GRAPHQL_URL,
        {
          query: gql`
            mutation insert_blocks(
              $address: String
              $block_id: String
              $block_num: Int
              $state_root_hash: String
              $time: timestamptz
              $value: jsonb
            ) {
              insert_blocks(
                objects: {
                  block_num: $block_num
                  block_id: $block_id
                  address: $address
                  time: $time
                  value: $value
                  state_root_hash: $state_root_hash
                }
              ) {
                returning {
                  block_num
                }
              }
            }
          `,
          variables: {
            block_num: parseInt(eventData.block_num),
            block_id: eventData.block_id,
            state_root_hash: eventData.state_root_hash,
            address: eventData.address,
            time: moment
              .unix(eventData.value.timestamp)
              .tz('Asia/Ho_Chi_Minh')
              .format('YYYY-MM-DD HH:mm:ssZ'),

            value: eventData.value
          }
        },
        {
          headers: {
            'x-hasura-admin-secret': process.env.GRAPHQL_SECRET
          }
        }
      )
      .then(res => console.log(res.data.data.insert_blocks.returning))
      .catch(err => console.log(err.message))
  }
)
