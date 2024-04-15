/* eslint-disable no-undef */
// require('dotenv').config()

import runServer from './api/server'
import { GQL_PORT } from '../common/util/config'

process.on('uncaughtException', (err) => {
  console.error(`${(new Date()).toUTCString()} uncaughtException:`, err)
  process.exit(0)
})

process.on('unhandledRejection', (err) => {
  console.error(`${(new Date()).toUTCString()} unhandledRejection:`, err)
})

runServer(GQL_PORT)
