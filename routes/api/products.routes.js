const express = require('express')
const router = express.Router()
const auth = require('../../service/middlewares/auth.middleware')
const {
  productController,
  addProductController,
  deleteProductController,
  getDayInfoConroller,
  getProductsNameController,
} = require('../../service/routes-services/products/products.controllers')
//* Public route

router.post('/public/daily', productController)

//* Private route
router.get('/:productName', auth, getProductsNameController)
router.post('/private/daily', auth, productController)
router.post('/add', auth, addProductController)
router.patch('/delete', auth, deleteProductController)
router.get('/day-info/:date', auth, getDayInfoConroller)

module.exports = router
