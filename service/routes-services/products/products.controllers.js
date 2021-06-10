const {
  productsDailySchema,
  addProductValidation,
  deleteProductValidation,
  dayInfoValidation,
} = require('../../helpers/Joi/products.schemas')
const { findUserByToken } = require('../auth/auth.methods')
const {
  findUserAndUpdateDate,
  findProduct,
  findProductsByBlood,
} = require('../products/products.methods')
const { nanoid } = require('nanoid')
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
  const { _id, token } = req.user
  try {
    const { dates } = await findUserByToken(token)
    const day = dates.find(day => day.date === date)
    const product = await findProduct({ 'title.ru': title })
    const caloriesFromWeight = parseInt((product.calories / 100) * weight)
    const id = nanoid()
    //* IF NEW DAY //
    if (!day) {
      const newDate = {
        date,
        caloriesReceived: caloriesFromWeight,
        products: [
          {
            title,
            weight,
            category: product.categories[0],
            calories: caloriesFromWeight,
            id,
          },
        ],
      }
      const newDates = [...dates, newDate]
      await findUserAndUpdateDate({ _id }, { dates: newDates })
      return res.json({
        calories: caloriesFromWeight,
        weight: weight,
        title: title,
        id,
      })
    }
    const updatedCaloriesReceived = +day.caloriesReceived + caloriesFromWeight
    const UpdatedProducts = [
      ...day.products,
      {
        title,
        weight,
        category: product.categories[0],
        calories: caloriesFromWeight,
        id,
      },
    ]
    const updatedDay = {
      date,
      caloriesReceived: updatedCaloriesReceived,
      products: UpdatedProducts,
    }
    const filtredDates = dates.filter(day => day.date !== date)
    const newDates = [...filtredDates, updatedDay]
    await findUserAndUpdateDate({ _id }, { dates: newDates })
    return res.json({
      calories: caloriesFromWeight,
      weight: weight,
      title: title,
      id,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// ? DELETE PRODUCT //
const deleteProductController = async (req, res, next) => {
  const { value, error } = deleteProductValidation.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.message })
  }
  const { id, date } = value
  const { token, _id } = req.user
  try {
    const { dates } = await findUserByToken(token)
    const day = dates.find(day => day.date === date)
    const { caloriesReceived } = day
    const productToDelete = day.products.find(prod => prod.id === id)
    if (productToDelete === undefined) {
      return res.status(404).json({ error: 'Product was not found' })
    }
    const filteredProducts = day.products.filter(
      prod => prod.id.toString() !== id,
    )
    // * DELETE DAY IF IT HAS NO PRODUCTS //
    if (filteredProducts.length === 0) {
      const filteredDates = dates.filter(item => item.date !== date)
      await findUserAndUpdateDate({ _id }, { dates: filteredDates })
      return res.status(200).json({ message: 'Product deleted' })
    }
    const updatedCaloriesReceived = caloriesReceived - productToDelete.calories
    const updatedDay = {
      id,
      date,
      caloriesReceived: updatedCaloriesReceived,
      products: filteredProducts,
    }
    const filtredDates = dates.filter(day => day.date !== date)
    const newDates = [...filtredDates, updatedDay]
    await findUserAndUpdateDate({ _id }, { dates: newDates })
    res.status(200).json({ message: 'Product deleted' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getDayInfoConroller = async (req, res, next) => {
  const { value, error } = dayInfoValidation.validate(req.params)
  if (error) {
    return res.status(400).json({ message: error.message })
  }
  try {
    const { token } = req.user
    const { dates } = await findUserByToken(token)
    const date = dates.find(day => day.date === value.date)
    if (date === undefined) {
      return res.status(404).json({ error: 'Date was not found' })
    }
    res.status(200).send(date)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  productController,
  addProductController,
  deleteProductController,
  getDayInfoConroller,
}
