const express = require('express')
const router = express.Router()
const {
  loginController,
  logOutController,
  createNewUser,
} = require('../../service/routes-services/auth/auth.controller.js')

router.post('/registration', createNewUser)

const auth = require('../../service/middlewares/auth.middleware.js')
router.post('/login', loginController)
router.post('/logout', auth, logOutController)

module.exports = router
