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

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)
  await Session.create({ token, userId: user.id })

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router
