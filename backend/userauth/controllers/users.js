const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('../util/email');

const { SECRET, SALT_ROUNDS } = require('../util/config')
const { tokenExtractor } = require('../../common/util/middleware')
const { User } = require('../../common/models')

router.post('/', async (req, res) => {
  const { username, password, email } = req.body
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
  const confirmationCode = jwt.sign({ email: req.body.email }, SECRET)
  const user = await User.create({ username, email, passwordHash, confirmationCode})
  res.status(201).json({
    message: "User registered succesfully! Check email for account activation."
  })
  nodemailer.sendConfirmationEmail(
    user.username,
    user.email,
    user.confirmationCode
  )
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

router.delete('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user.id === req.decodedToken.id) {
    await user.destroy()
    res.status(200)
  }
})

module.exports = router
