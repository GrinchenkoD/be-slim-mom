const express = require('express')
const router = express.Router()

//* Public route

router.post('/public/daily')

//* Private route
router.get('/:productName')
router.post('/private/daily')
router.post('/add')
router.post('/delete')
router.get('/day-info/:date')

module.exports = router
