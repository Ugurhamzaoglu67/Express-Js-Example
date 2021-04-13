const express = require('express')
const router = express.Router()

const path =require('path')


router.get('/add-product',(req,res,next) => {

     res.render('add-product',{my_title:'Ürün Ekleme Sayfası'})

});


router.post('/add-product',(req,res,next)=> {

      console.log(req.body)
      res.redirect('/')
});



module.exports = router