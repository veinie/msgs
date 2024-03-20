const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('@apollo/server')
const { WebSocketServer } = require('ws')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { useServer } = require('graphql-ws/lib/use/ws')
const { expressMiddleware } = require('@apollo/server/express4')
const http = require('http');
const cors = require('cors');
const { GQL_PORT } = require('../common/util/config')
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const context = require('./graphql/context');


const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/api',
  })
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })
  await server.start()
  app.use(
    '/api',
    cors(),
    express.json(),
  )
  httpServer.listen(GQL_PORT, () =>
    console.log(`Server is now running on http://localhost:${GQL_PORT}`))
}

start()
