const Joi = require('joi')

const loginValidation = Joi.object({
  password: Joi.string().required(),
  login: Joi.string().required(),
})
module.exports = loginValidation
