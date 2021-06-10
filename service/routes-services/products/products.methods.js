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
const findProductsName = async searchQuerry => {
  const result = await Product.find({
    'title.ru': { $elemMatch: { $in: [searchQuerry] } },
  })
  console.log(searchQuerry)
  console.log(result)
}

module.exports = {
  findProductsByBlood,
  findUserAndUpdateDate,
  findProduct,
  findProductsName,
}
