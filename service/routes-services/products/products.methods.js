const Product = require('../../schemas/products')

const findProductsByBlood = async bloodType => {
  const result = await Product.find({ groupBloodNotAllowed: { $in: [true] } })
  return result.reduce((acc, product) => {
    return product.groupBloodNotAllowed[bloodType] === true
      ? [...acc, product.title.ru]
      : acc
  }, [])
}

module.exports = findProductsByBlood
