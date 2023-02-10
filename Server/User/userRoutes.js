const express = require('express')
const router = express.Router();
const {createUserMiddleware, loginUserMiddleware} =  require('./user')

router.post('/create-user', createUserMiddleware)
router.post('/login-user', loginUserMiddleware)
module.exports = router



