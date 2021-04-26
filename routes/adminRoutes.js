const express = require('express')
const router = express.Router()
const  adminController = require('../controllers/adminController')
const isAuthenticated = require('../middleware/authentication')


router.get('/add-product',isAuthenticated ,adminController.getAddProduct);

router.post('/add-product',isAuthenticated ,adminController.postAddProduct);
router.get('/products',isAuthenticated ,adminController.getProducts);

// edit product
router.get('/products/:productid',isAuthenticated ,adminController.getEditProduct);
router.post('/products',isAuthenticated ,adminController.postEditProduct);
router.post('/delete-product',isAuthenticated , adminController.postDeleteProduct)

//category
router.get('/add-category',isAuthenticated ,adminController.getAddCategory)
router.post('/add-category',isAuthenticated ,adminController.postAddCategory)
router.post('/delete-category',isAuthenticated ,adminController.postDeleteCategory)

//categories
router.get('/categories',isAuthenticated ,adminController.getCategories)
router.get('/categories/:categoryid',isAuthenticated ,adminController.getEditCategory)
router.post('/categories',isAuthenticated ,adminController.postEditCategory)


module.exports = router
