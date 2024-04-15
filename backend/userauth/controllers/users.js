const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('../util/email')

const { SECRET, SALT_ROUNDS } = require('../util/config')
const { tokenExtractor } = require('../../common/util/middleware')
const { User, Session, Userchat, Message, RecoveryToken } = require('../../common/models')

router.post('/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body
    if (!(username && password && email)) return res.status(400).json({ error: 'Required parameters missing' })
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const confirmationCode = jwt.sign({ email: req.body.email }, SECRET)
    const user = await User.create({ username, email, passwordHash, confirmationCode })
    res.status(201).json({
      message: 'User registered succesfully! Check email for account activation.'
    })
    nodemailer.sendConfirmationEmail(
      user.username,
      user.email,
      user.confirmationCode
    )
  } catch (error) {
    console.log(error)
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(409).json({ error: 'Email already registered' })
    }
  }
})

router.get('/confirm/:confirmationCode', async (req, res) => {
  const user = await User.findOne({
    where: {
      confirmationCode: req.params.confirmationCode
    }
  })

  if (!user) return res.status(404).json({ message: 'User not found.' })

  user.active = true
  await user.save()
  res.status(200).json({ message: 'User activated.' })
})

router.post('/resetpassword', tokenExtractor, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const user = await User.scope('unlimited').findByPk(req.decodedToken.id)
  
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(oldPassword, user.passwordHash)
  
    if (passwordCorrect) {
      const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS)
      user.passwordHash = newPasswordHash
      await user.save()
      await Session.destroy({
        where: {
          userId: req.decodedToken.id,
        }
      })
      res.status(200).json({ message: 'updated succesfully' })
    } else {
      res.status(401).json({ error: 'invalid credentials' })
    }
  } catch (error) {
    console.log(error)
    res.status(500)._construct({ error: error.message })
  }
})

router.patch('/changeusername', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const { newUsername } = req.body
  if (!(user && newUsername)) {
    res.status(400).json({ error: 'Username required' })
  } else {
    user.username = newUsername
    await user.save()
    res.status(204).send({ username: user.username })
  }
})

router.post('/passwordresetrequest', async (req, res) => {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ error: 'email required in request body' })
    const user = await User.scope('unlimited').findOne({
      where: { email }
    })
    if (user) {
      const hash = bcrypt.hash(email, SALT_ROUNDS)
      const token = jwt.sign({ secret: hash }, SECRET, options = { expiresIn: '1h' })
      await RecoveryToken.create({
        token,
        userId: user.id,
      })
      nodemailer.sendPasswordResetEmail(
        user.username,
        user.email,
        token
      )
    }
    res.status(200).end()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

router.post('/recoverpassword', async (req, res) => {
  const { newPassword, recoveryToken } = req.body
  try {
    decodedToken = jwt.verify(recoveryToken, SECRET)
    const token = await RecoveryToken.findOne({
      where: {
        token: recoveryToken
      }
    })
    const user = await User.findByPk(token.userId)
    const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS)
    user.passwordHash = newPasswordHash
    await user.save()
    await token.destroy()
    await Session.destroy({
      where: {
        userId: user.id,
      }
    })
    res.status(200).json({ message: 'updated succesfully' })
  } catch (error) {
    console.log(error)
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ error: 'Token expired' })
    }
    return res.status(400).json({ error: 'Token validation failed.' })
  }
})

router.delete('/', tokenExtractor, async (req, res) => {
  if (!req.body.userId) return res.status(400).json({ error: 'userId required in request body' })
  const { userId } = req.body
  try {
    const user = await User.findByPk(req.decodedToken.id)
    if (user.id !== userId) return res.status(401).json({ error: 'Unauthorized' })
    await Message.destroy({
      where: {
        user_id: user.id
      }
    })
    await Userchat.destroy({
      where: {
        user_id: user.id
      }
    })
    await Session.destroy({
      where: {
        userId: user.id
      }
    })
    await Userchat.update({ requester_id: null }, {
      where: {
        requester_id: user.id
      }
    })
    await user.destroy()
    res.status(204).end()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

module.exports = router
