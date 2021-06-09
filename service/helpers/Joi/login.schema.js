const Joi = require('joi')

const loginValidation = Joi.object({
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .min(6)
    .max(8)
    .required(),
  login: Joi.string().required(),
})
module.exports = loginValidation
