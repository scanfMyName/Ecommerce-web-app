const express = require('express')
const router = express.Router();
const {createProductMiddleware, getAllProducts, getProductDetails} =  require('./product')

router.post('/create-product', createProductMiddleware)
router.get('/getall', getAllProducts)
router.get('/details/:id', getProductDetails)

module.exports = router
// getall => will give all the products basic details like title category price id photo ratings 

//details => will give all the details of the products like description, reviews, ratings, all the available stocks and price, size images and colour of the product  /${id}

//create-product => will create a new product in the database using all the fields in the product model


