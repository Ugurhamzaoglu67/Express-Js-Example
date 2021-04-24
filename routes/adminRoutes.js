const express = require('express')
const router = express.Router()
const  adminController = require('../controllers/adminController')


router.get('/add-product', adminController.getAddProduct);
router.post('/add-product',adminController.postAddProduct);
router.get('/products',adminController.getProducts);

// edit product
router.get('/products/:productid',adminController.getEditProduct);
router.post('/products',adminController.postEditProduct);
router.post('/delete-product', adminController.postDeleteProduct)

//category
router.get('/add-category',adminController.getAddCategory)
router.post('/add-category',adminController.postAddCategory)
router.post('/delete-category',adminController.postDeleteCategory)

//categories
router.get('/categories',adminController.getCategories)
router.get('/categories/:categoryid',adminController.getEditCategory)
router.post('/categories',adminController.postEditCategory)


module.exports = router
