const express = require('express')
const app = express()
const cors = require('cors')

const { PORT } = require('../common/util/config')
const { connectToDatabase } = require('../common/util/db')
const middleware = require('../common/util/middleware')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.get('/api/health', (_req, res) => {
  res.status(200).send('OK')
})

app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
