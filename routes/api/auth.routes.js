const express = require('express')
const router = express.Router()
const auth = require('../../service/middlewares/auth.middleware.js')

const {
  loginController,
  logOutController,
  createNewUser,
} = require('../../service/routes-services/auth/auth.controller.js')

router.post('/registration', createNewUser)

router.post('/login', loginController)
router.post('/logout', auth, logOutController)

module.exports = router
