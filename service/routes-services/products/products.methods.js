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

const findUserAndUpdateProducts = (param, products) => {
  return User.findOneAndUpdate(param, products, { new: true })
}
const findProduct = title => {
  return Product.findOne(title)
}
module.exports = { findProductsByBlood, findUserAndUpdateProducts, findProduct }
