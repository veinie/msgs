const router = require('express').Router()

const Session = require('../models/session')
const { tokenExtractor } = require('../util/middleware')

router.post('/', tokenExtractor, async (req, res) => {
  if (req.body.global) {
    await Session.destroy({
      where: {
        userId: req.decodedToken.id,
      }
    })
  } else {
    await Session.destroy({
      where: {
        userId: req.decodedToken.id,
        token: req.token
      }
    })
  }
  res
    .status(200)
    .json({ msg: 'Logout succesful' })
})

module.exports = router
