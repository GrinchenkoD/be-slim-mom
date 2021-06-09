const Joi = require('joi').extend(require('@joi/date'))

const addProductValidation = Joi.object({
  title: Joi.string().required(),
  weight: Joi.number().min(1).required(),
  date: Joi.date().format('YYYY-MM-DD').raw(),
})

module.exports = { addProductValidation }
