const express = require('express')
const router = express.Router()
const control = require('../controller/process')

router.get('/',control.process)
router.get('/products/:productId',control.getProduct)
router.get('/products',control.output)
router.post('/items',control.items)
router.post('/cart',control.postcart)
router.get('/editproducts/:productId',control.editProduct)
router.post('/edit-product',control.postEditProduct)

module.exports =router