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
const { connectToDatabase } = require('../../common/util/db')
const typeDefs = require('../graphql/schemas');
const resolvers = require('../graphql/resolvers');
const context = require('../graphql/context');
const { errorHandler, requestLogger } = require('../../common/util/middleware')


const runServer = async (PORT) => {
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
  await connectToDatabase()
  await server.start()
  app.use(
    '/api',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context,
      errorHandler,
      requestLogger,
    })
  )
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`))
}

module.exports = runServer
