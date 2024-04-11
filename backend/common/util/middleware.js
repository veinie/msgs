const jwt = require('jsonwebtoken')
const logger = require('./logger')
const { SECRET } = require('../util/config')
const { User, Session } = require('../models')


const requestLogger = (req, _res, next) => {
  let logstring = `${req.method} ${req.path}`

  function hasPassword(key) {
    const regex = /password/i
    return regex.test(key)
  }

  if (req.body) {
    const logBody = {}

    Object.entries(req.body).forEach(([key, value]) => {
      const logValue = hasPassword(key)
        ? '*****'
        : value
      logBody[key] = logValue
    })

    logstring += ` ${ JSON.stringify(logBody) }`
  }

  logger.info(logstring)
  next()
}

const unknownEndpoint = (_req, res, next) => {
  res.status(404).send({ error: 'unknown endpoint' })
  next()
}

const errorHandler = (error, _req, res, next) => {
  logger.error(`${error.name}: ${error.message}`)
  res.json({ error: `${ error.name }: ${ error.message }` })
  next(error) 
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  let token
  let decodedToken

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const encodedToken = authorization.substring(7)
      token = encodedToken
      decodedToken = jwt.verify(encodedToken, SECRET)

      const session = await Session.findOne({
        where: {
          token: encodedToken
        }
      })

      if (!session) return new Error('Transaction attempt with an invalid token')

      const user = await User.findByPk(session.userId)

      if (!user.active) {
        await Session.destroy({
          where: {
            userId: user.id
          }
        })
        return new Error('Transaction attempt by an inactive user')
      }

      if (decodedToken && session && user.active) {
        req.token = token
        req.decodedToken = decodedToken
        req.sessionId = session.id
      }
      
    } catch (error){
      if (error.name === jwt.TokenExpiredError) {
        await Session.destroy({
          where: {
            token: authorization.substring(7)
          }
        })
      }

      if (res) {
        return res.status(401).json({ error: 'token invalid' })
      } else {
        return new Error('token invalid')
      }

    }
  } else {
    return res.status(401).json({ error: 'Bearer token missing' })
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
}
