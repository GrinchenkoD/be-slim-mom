const Product = require('../../schemas/products')

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

module.exports = findProductsByBlood
