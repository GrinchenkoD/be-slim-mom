const express = require('express')
const router = express.Router()
const {
  createNewUser,
} = require('../../service/routes-services/auth/auth.controller.js')

router.post('/registration', createNewUser)
module.exports = router
