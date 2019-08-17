const Koa = require('koa')
const Router = require('koa-router')
const { ApolloServer, gql } = require('apollo-server-koa')
const redis = require('redis')
const next = require('next')

const { promisify } = require('util')
const admin = require('./utils/fb')

const client = redis.createClient()
const getAsync = promisify(client.get).bind(client)

const typeDefs = gql`
  type Query {
    users: String
  }
  type User {
    name: String
  }
`

const resolvers = {
  Query: {
    users: async (parent, args, { user }) => {
      console.log(user)
      const res = await getAsync('foo')
      return res
    }
  }
}

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ ctx }) => {
    const token = ctx.request.headers
    console.log(token)
    // if (token)
    //   admin
    //     .auth()
    //     .verifyIdToken(token)
    //     .then(function(decodedToken) {
    //       let uid = decodedToken.uid
    //       console.log(uid)
    //       return { user: uid }
    //     })
    //     .catch(function(error) {
    //       console.log(error)
    //       return { error }
    //     })

    // // try to retrieve a user with the token
    const user = { token: 'ok' }

    // add the user to the context
    return { user }
  }
})

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  apolloServer.applyMiddleware({ app: server })

  router.get('*', async ctx => {
    if (!ctx.path.match(/graphql/)) {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    }
  })

  server.use(router.routes())
  server.listen(port, () => {
    console.log(`🚀 Ready on http://localhost:${port}`)
    console.log(`🚀 Server ready http://localhost:${port}${server.graphqlPath}`)
  })
})
