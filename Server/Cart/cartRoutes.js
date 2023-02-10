const express = require('express')
const router = express.Router();
const {createCartItemMiddleware,updateCartItemMiddleware, deleteCartItemMiddleware, getUserCartMiddleware, purchaseCartItem} =  require('./cart')

router.post('/create-cartItem', createCartItemMiddleware)
router.put('/update-cartItem/:id', updateCartItemMiddleware)
router.delete('/delete-cartItem/:id', deleteCartItemMiddleware)
router.get('/getUserCart/:username', getUserCartMiddleware)
router.put('/purchase-cartItems/:username', purchaseCartItem)
module.exports = router

// Path: /cart/create-cartItem => create a cart item in the database having properties like productId, userId, prodDetailssize, prodDetailscolour, prodDetailsquantity(this quantity is with respect to the current combination of size and colour)

// Path: /cart/update-cartItem/:id => update a cart item in the database having the id as the id in the url

// Path: /cart/delete-cartItem/:id => delete a cart item from the database having the id as the id in the url


// Path: /cart/getUserCart/:username => get all the cart items of a user having the username as the username in the url

// Path: /cart/purchase-cartItem/:username => purchase a cart item having the id as the id in the url

