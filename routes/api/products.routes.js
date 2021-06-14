const express = require('express')
const router = express.Router()
const auth = require('../../service/middlewares/auth.middleware')
const ErrorWrapper = require('../../service/helpers/error-wrapper')
const {
  productController,
  addProductController,
  deleteProductController,
  getDayInfoConroller,
  getProductsNameController,
} = require('../../service/routes-services/products/products.controllers')
//* Public route

router.post('/public/daily', ErrorWrapper(productController))

//* Private route
router.get('/:productName', auth, ErrorWrapper(getProductsNameController))
router.post('/private/daily', auth, ErrorWrapper(productController))
router.post('/add', auth, ErrorWrapper(addProductController))
router.patch('/delete', auth, ErrorWrapper(deleteProductController))
router.get('/day-info/:date', auth, ErrorWrapper(getDayInfoConroller))

module.exports = router
