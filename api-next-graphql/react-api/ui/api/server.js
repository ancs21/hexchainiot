const path = require('path')
const atob = require('atob')
const Redis = require('ioredis')
const express = require('express')
const isEmpty = require('lodash/isEmpty')
const { ApolloServer, gql } = require('apollo-server-express')

const admin = require('./utils/fb')
const DeviceAPI = require('./sources/device')
const BlockchainAPI = require('./sources/blockchain')

const redis = new Redis()

const typeDefs = gql`
  type Device {
    id: String
    created_at: String
    name: String
    description: String
    address: String
  }
  type BlockchainStateAddress {
    data: String
  }
  type SensorData {
    timestamp: String
    temp: String
    pin: String
    oxy: String
    ph: String
  }
  type Query {
    hello: String
    devices: [Device]
    deviceById(deviceId: String): Device
    deviceSendData(deviceId: String): String
    stateByAddress(address: String): BlockchainStateAddress
    transactionsByAddress(address: String, last: Int): [String]
    historyDataOnBlockchainByAddress(address: String, last: Int): [SensorData]
  }
  type Mutation {
    add_device(name: String, description: String): Device
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: async (_, args, { userId, dataSources }) => {
      const data = await dataSources.deviceAPI.createKey()
      return 'Hello world!'
    },
    devices: async (_, args, { userId }) => {
      if (!userId) throw new Error('You need login')

      let data = []
      const result = await redis.smembers(`user:${userId}:devices`)
      if (result.length > 0) {
        data = await Promise.all(
          result.map(async item => await redis.hgetall(item))
        )
      }
      if (data.length > 0) {
        // console.log(orderBy(data, ['created_at'], ['asc']))
        data = data.sort(
          (d1, d2) =>
            new Date(d2.created_at).getTime() -
            new Date(d1.created_at).getTime()
        )
      }
      return data
    },
    deviceById: async (_, { deviceId }, { userId }) => {
      if (!userId) throw new Error('You need login')
      try {
        const result = await redis.hgetall(`user:${userId}:devices:${deviceId}`)
        if (isEmpty(result)) {
          throw new Error('Device is not exist')
        }
        return result
      } catch (error) {
        throw new Error(error)
      }
    },
    deviceSendData: async (_, { deviceId }, { userId, dataSources }) => {
      if (!userId) throw new Error('You need login')
      try {
        const result = await dataSources.deviceAPI.getDeviceToken(deviceId)
        console.log(result)

        return `http://104.197.226.82:8888/device/send_raw?temp=[temp]1&pin=[pin]&oxy=[oxy]&ph=[ph]&token=${
          result.token
        }`
      } catch (error) {
        throw new Error(error)
      }
    },
    stateByAddress: async (_, { address }, { userId, dataSources }) => {
      if (!userId) throw new Error('You need login')
      try {
        const res = await dataSources.blockchainAPI.getStateByAddress(address)
        if (res.data.length !== 0) {
          const data = atob(res.data[0].data)
          return {
            data
          }
        }
        return {
          data: null
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    transactionsByAddress: async (_, { address, last }, { userId }) => {
      if (!userId) throw new Error('You need login')
      const lastData = last ? last : 10
      try {
        const result = await redis.lrange(
          `devices:transactions_list:${address}`,
          -lastData,
          -1
        )
        if (isEmpty(result)) {
          throw new Error('Device is not exist')
        }
        return result
      } catch (error) {
        throw new Error(error)
      }
    },

    historyDataOnBlockchainByAddress: async (
      _,
      { address, last },
      { userId, dataSources }
    ) => {
      if (!userId) throw new Error('You need login')
      const lastData = last ? last : 10
      try {
        const result = await redis.lrange(
          `devices:transactions_list:${address}`,
          -lastData,
          -1
        )
        if (isEmpty(result)) {
          throw new Error('Device is not exist')
        }
        let data = []
        const res = await dataSources.blockchainAPI.getDataFromReceipts(result)
        if (result.length > 0) {
          data = await Promise.all(
            res.data.map(async item => {
              const { state_changes } = item
              return JSON.parse(atob(state_changes[0].value))
            })
          )
        }

        return data
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  Mutation: {
    add_device: async (_, { name, description }, { userId, dataSources }) => {
      if (!userId) throw new Error('You need login')
      try {
        const data = await dataSources.deviceAPI.createKey()
        const keyAdd = `user:${userId}:devices`
        const created_at = new Date().toISOString()
        await redis
          .multi()
          .hmset(
            `${keyAdd}:${data.deviceId}`,
            'id',
            data.deviceId,
            'created_at',
            created_at,
            'name',
            name,
            'description',
            description,
            'address',
            data.address_blockchain
          )
          .sadd(keyAdd, `${keyAdd}:${data.deviceId}`)
          .exec()

        return {
          id: data.deviceId,
          created_at,
          name,
          description,
          address: data.address_blockchain
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      deviceAPI: new DeviceAPI(),
      blockchainAPI: new BlockchainAPI()
    }
  },
  context: async ({ req }) => {
    const token = req.headers.authorization
      ? req.headers.authorization.split('Bearer ')[1]
      : null
    if (token) {
      try {
        const decodedToken = await admin.auth().verifyIdToken(token)
        return { userId: decodedToken.uid }
      } catch (error) {
        return { userId: null }
      }
    }
    return { userId: null }
  }
})

const app = express()
app.use(express.static(path.join(__dirname, 'build')))

server.applyMiddleware({ app, path: '/graphql' })

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
