const express = require('express')
const router = express.Router()
const  adminController = require('../controllers/adminController')
const isAuthenticated = require('../middleware/authentication')
const csrf = require('../middleware/csrf')

router.get('/add-product',isAuthenticated ,csrf,adminController.getAddProduct);

router.post('/add-product',csrf,isAuthenticated ,adminController.postAddProduct);
router.get('/products',isAuthenticated ,csrf,adminController.getProducts);

// edit product
router.get('/products/:productid',csrf,isAuthenticated ,adminController.getEditProduct);
router.post('/products',csrf,isAuthenticated ,adminController.postEditProduct);
router.post('/delete-product',csrf,isAuthenticated , adminController.postDeleteProduct)

//category
router.get('/add-category',csrf,isAuthenticated ,adminController.getAddCategory)
router.post('/add-category',csrf,isAuthenticated ,adminController.postAddCategory)
router.post('/delete-category',csrf,isAuthenticated ,adminController.postDeleteCategory)

//categories
router.get('/categories',csrf,isAuthenticated ,adminController.getCategories)
router.get('/categories/:categoryid',csrf,isAuthenticated ,adminController.getEditCategory)
router.post('/categories',csrf,isAuthenticated ,adminController.postEditCategory)


module.exports = router
