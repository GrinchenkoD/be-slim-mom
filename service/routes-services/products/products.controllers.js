const productsDailySchema = require('../../helpers/Joi/products.schemas')
const { findUserByToken } = require('../auth/auth.methods')
const { addProductValidation } = require('../../helpers/Joi/products.schema')
const {
  findUserAndUpdateProducts,
  findProduct,
  findProductsByBlood,
} = require('../products/products.methods')

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

// ? ADD PRODUCT //
const addProductController = async (req, res, next) => {
  const { value, error } = addProductValidation.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.message })
  }
  const { title, weight, date } = value
  const { _id, products, dailyCalories } = req.user
  try {
    const product = await findProduct({ 'title.ru': title })
    const caloriesFromWeight = (product.calories / 100) * weight
    const newCalories = +dailyCalories + caloriesFromWeight
    const UpdatedProducts = [...products, { title, weight, date }]
    await findUserAndUpdateProducts(
      { _id },
      { dailyCalories: newCalories, products: UpdatedProducts },
    )
    res.json({
      calories: caloriesFromWeight,
      weight: weight,
      title: title,
      _id,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// ? DELETE PRODUCT //
const deleteProductController = (req, res, next) => {}

module.exports = {
  productController,
  addProductController,
  deleteProductController,
}
