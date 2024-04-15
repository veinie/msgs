/* eslint-disable no-undef */

const runServer = require('./api/server')
const { GQL_PORT } = require('../common/util/config')

process.on('uncaughtException', (err) => {
  console.error(`${(new Date()).toUTCString()} uncaughtException:`, err)
  process.exit(0)
})

process.on('unhandledRejection', (err) => {
  console.error(`${(new Date()).toUTCString()} unhandledRejection:`, err)
})

runServer(GQL_PORT)
