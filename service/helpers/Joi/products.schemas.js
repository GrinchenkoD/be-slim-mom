const Joi = require('joi').extend(require('@joi/date'))

const productsDailySchema = Joi.object({
  height: Joi.number().required(),
  age: Joi.number().required(),
  currentWeight: Joi.number().required(),
  desiredWeight: Joi.number().required(),
  bloodType: Joi.number().min(1).max(4).required(),
})

const addProductValidation = Joi.object({
  title: Joi.string().required(),
  weight: Joi.number().min(1).required(),
  date: Joi.date().format('DD-MM-YYYY').raw(),
})

const deleteProductValidation = Joi.object({
  date: Joi.date().format('DD-MM-YYYY').raw(),
  id: Joi.string().required(),
})

const dayInfoValidation = Joi.object({
  date: Joi.date().format('DD-MM-YYYY').raw(),
})
module.exports = {
  productsDailySchema,
  addProductValidation,
  deleteProductValidation,
  dayInfoValidation,
}
