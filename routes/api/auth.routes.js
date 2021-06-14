const express = require('express')
const router = express.Router()
const auth = require('../../service/middlewares/auth.middleware.js')
const ErrorWrapper = require('../../service/helpers/error-wrapper')
const {
  loginController,
  logOutController,
  createNewUser,
} = require('../../service/routes-services/auth/auth.controller.js')

router.post('/registration', ErrorWrapper(createNewUser))

router.post('/login', ErrorWrapper(loginController))
router.post('/logout', auth, ErrorWrapper(logOutController))

module.exports = router
