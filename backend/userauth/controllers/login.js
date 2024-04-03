const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { User, Session } = require('../../common/models')
const { tokenExtractor } = require('../../common/util/middleware')

router.post('/', async (req, res) => {
  const body = req.body
  const user = await User.scope('unlimited').findOne({
    where: {
      email: body.email,
    }
  })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!user || !passwordCorrect) {
    return res.status(401).json({
      error: 'invalid email or password'
    })
  }

  if (!user.active) {
    return res.status(403).json({ msg: 'User deactivated' })
  }

  const payload = {
    username: user.username,
    id: user.id,
  }

  const expiresIn = body.extendedSession
    ? '30d'
    : '1h'

  const options = {
    expiresIn
  }

  const token = jwt.sign(payload, SECRET, options)
  await Session.create({ token, userId: user.id })

  res
    .status(200)
    .send({ token, username: user.username, id: user.id })
})

router.get('/refresh', tokenExtractor, async (req, res) => {
  try {
    const session = await Session.findByPk(req.sessionId)
    const username = req.decodedToken.username
    const id = req.decodedToken.id
  
    const payload = {
      username,
      id
    }
  
    const options = {
      expiresIn: '30m'
    }
  
    const refreshedToken = jwt.sign(payload, SECRET, options)
    session.token = refreshedToken
    await session.save() 
  
    res.status(200).send({ token: refreshedToken, username, id })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
