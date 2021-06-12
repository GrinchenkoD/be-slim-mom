const Product = require('../../schemas/products')
const User = require('../../schemas/users')

const findProductsByBlood = async bloodType => {
  const findProducts = await Product.find({
    groupBloodNotAllowed: { $in: [true] },
  })

  const productsCategories = findProducts.reduce((acc, product) => {
    return product.groupBloodNotAllowed[bloodType] === true
      ? [...acc, product.categories[0]]
      : acc
  }, [])
  return Array.from(new Set(productsCategories))
}

const findUserAndAddDate = (
  param,
  date,
  caloriesFromWeight,
  title,
  weight,
  category,
  id,
) => {
  return User.findOneAndUpdate(
    param,
    {
      $push: {
        dates: {
          date,
          caloriesReceived: caloriesFromWeight,
          products: [
            {
              title,
              weight,
              category,
              calories: caloriesFromWeight,
              id,
            },
          ],
        },
      },
    },
    { new: true },
  )
}
const findUserAndAddProduct = (
  { _id, date },
  updatedCaloriesReceived,
  title,
  weight,
  category,
  calories,
  id,
) => {
  return User.findOneAndUpdate(
    { _id, 'dates.date': date },
    {
      $set: { 'dates.$.caloriesReceived': updatedCaloriesReceived },
      $push: { 'dates.$.products': { title, weight, category, calories, id } },
    },
  )
}

const findUserAndRemoveProduct = (
  { _id, date },
  updatedCaloriesReceived,
  id,
  filteredProducts,
) => {
  return User.findOneAndUpdate(
    { _id, 'dates.date': date },
    {
      $set: {
        'dates.$.caloriesReceived': updatedCaloriesReceived,
        'dates.$.products': filteredProducts,
      },
    },
  )
}

const findProduct = title => {
  return Product.findOne(title)
}
const findProductsName = async searchQuerry => {
  const regex = new RegExp(searchQuerry, 'gi')
  const result = await Product.find({
    'title.ru': { $regex: regex },
  })

  return result.map(product => product.title.ru)
}

module.exports = {
  findProductsByBlood,
  findUserAndAddDate,
  findUserAndAddProduct,
  findProduct,
  findProductsName,
  findUserAndRemoveProduct,
}
