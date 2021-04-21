const express = require('express')
const router = express.Router()


const shopController = require('../controllers/shopController')

//Not ->Dinamik olmayan yapılar, dinamik yapıların üstünde olmak zorunda.


router.get('/',shopController.getIndex);
router.get('/products/:productid',shopController.getProduct)

router.get('/categories/:categoryid',shopController.getProductsByCategoryId)
router.get('/products',shopController.getProducts)
//router.get('/details',shopController.getProductDetails)
router.get('/cart',shopController.getCart)
router.post('/cart',shopController.postCart)
router.post('/delete-cartitem',shopController.postCartItemDelete)
router.get('/orders',shopController.getOrders)




module.exports = router