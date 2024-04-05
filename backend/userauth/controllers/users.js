const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('../util/email');

const { SECRET, SALT_ROUNDS } = require('../util/config')
const { tokenExtractor } = require('../../common/util/middleware')
const { User, Session } = require('../../common/models')

router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
  const confirmationCode = jwt.sign({ email: req.body.email }, SECRET)
  try {
    const user = await User.create({ username, email, passwordHash, confirmationCode})
    res.status(201).json({
      message: "User registered succesfully! Check email for account activation."
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

  if (!user) return res.status(404).json({ message: "User not found." })

  user.active = true
  await user.save()
  res.status(200).json({ message: "User activated." })
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
  const user = await User.findOne({
    where: { email }
  })
  if (user && req.body.email) {
    confirmationCode = jwt.sign({ email: req.body.email }, SECRET)
    nodemailer.sendPasswordResetEmail(
      user.username,
      user.email,
      user.confirmationCode
    )
  }
  res.status(200)
})

router.get('/resetpassword/:confirmationCode', async (req, res) => {
  return
})

// router.delete('/:id', tokenExtractor, async (req, res) => {
//   const user = await User.findByPk(req.params.id)
//   if (user.id === req.decodedToken.id) {
//     await user.destroy()
//     res.status(200)
//   }
// })

module.exports = router
