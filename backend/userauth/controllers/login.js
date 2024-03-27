const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { User, Session } = require('../../common/models')

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

module.exports = router
