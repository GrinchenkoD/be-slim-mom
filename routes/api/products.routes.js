const express = require('express')
const router = express.Router()
const Product = require('../../service/schemas/products')
const auth = require('../../service/middlewares/auth.middleware')
const {
  productController,
  addProductController,
  deleteProductController,
} = require('../../service/routes-services/products/products.controllers')
//* Public route

router.post('/public/daily', productController)

//* Private route
router.get('/:productName')
router.post('/private/daily', auth, productController)
router.post('/add', auth, addProductController)
router.patch('/delete', auth, deleteProductController)
router.get('/day-info/:date')

//! TEST
router.get('/', async (req, res) => {
  const data = await Product.find()
  // res.json('well done')
  res.send(data)
})
module.exports = router
