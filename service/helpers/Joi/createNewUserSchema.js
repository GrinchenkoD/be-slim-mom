const Joi = require('joi')

const createNewUserSchema = Joi.object({
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().min(6).required(),
})

module.exports = { createNewUserSchema }
