const findProductsByBlood = require('../products/products.methods')
const productsDailySchema = require('../../helpers/Joi/products.schemas')
const { findUserByToken } = require('../auth/auth.methods')

const productController = async (req, res, next) => {
  const { value, error } = productsDailySchema.validate(req.body)
  const { height, age, currentWeight, desiredWeight, bloodType } = value

  if (error) {
    res.status(400).json({ message: error.message })
  }
  try {
    const dailyCalories = parseInt(
      10 * currentWeight +
        6.25 * height -
        5 * age -
        161 -
        10 * (currentWeight - desiredWeight),
    )
    const forbidenCategories = await findProductsByBlood(bloodType)
    if (req.user && req.user.token) {
      const { token } = req.user
      const user = await findUserByToken(token)
      await user.updateOne({
        dailyCalories,
        forbidenCategories: [...forbidenCategories],
      })
      return res.status(200).json({
        dailyCalories,
        forbidenCategories,
      })
    }

    res.status(200).json({
      dailyCalories,
      forbidenCategories,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { productController }
