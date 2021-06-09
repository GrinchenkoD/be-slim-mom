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

const findUserAndUpdateDate = (param, dates) => {
  return User.findOneAndUpdate(param, dates, { new: true })
}
const findProduct = title => {
  return Product.findOne(title)
}

const findDay = date => {
  return User.findOne(date)
}
module.exports = {
  findProductsByBlood,
  findUserAndUpdateDate,
  findProduct,
  findDay,
}
