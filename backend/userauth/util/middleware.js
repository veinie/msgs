const jwt = require('jsonwebtoken')
const logger = require('./logger')
const { SECRET } = require('../util/config')
const { User, Session } = require('../models')


const requestLogger = (req, _res, next) => {
  let logstring = `${req.method} ${req.path}`
  if (req.body) {
    if (req.body.password) {
      logstring += ` ${ JSON.stringify({ ...req.body, password: '****' }) }`
    } else {
      logstring += ` ${ JSON.stringify(req.body) }`
    }
  }
  logger.info(logstring)
  next()
}

const unknownEndpoint = (_req, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _req, _res, next) => {
  logger.error(`${error.name}: ${error.message}`)
  next(error) 
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const encodedToken = authorization.substring(7)
      req.token = encodedToken
      req.decodedToken = jwt.verify(encodedToken, SECRET)

      const session = await Session.findOne({
        where: {
          token: encodedToken
        }
      })

      if (!session) throw new Error('Transaction attempt with an invalid token')

      const user = await User.findByPk(session.userId)

      if (!user.active) {
        await Session.destroy({
          where: {
            userId: user.id
          }
        })
        throw new Error('Transaction attempt by an inactive user')
      }
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
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
