const express = require('express')
const router = express.Router();

//filter category wise 


//filter price wise

//filter rating wise


const {categoryFilterMiddleware, priceFilterMiddleware, ratingFilterMiddleware} =  require('./filter')

router.post('/category', categoryFilterMiddleware)
router.post('/price', priceFilterMiddleware)
router.post('/rating/', ratingFilterMiddleware)

module.exports = router