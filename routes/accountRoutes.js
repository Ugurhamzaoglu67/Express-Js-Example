const express = require('express')
const router = express.Router()

const accountController = require('../controllers/accountController.js')


router.get('/login',accountController.getLogin)
router.post('/login',accountController.postLogin)
router.get('/logout',accountController.getLogout)


router.get('/register',accountController.getRegister)
router.post('/register',accountController.postRegister)


router.get('/reset-password',accountController.getReset)
router.post('/reset-password',accountController.postReset)


module.exports = router


