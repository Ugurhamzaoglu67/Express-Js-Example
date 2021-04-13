const express = require('express')
const router = express.Router()
const path = require('path')



router.get('/',(req,res,next) => {

      const products = [
            {
                  name:'Samsung S8',
                  price:3000,
                  image:'galaxy-a71-gorseli-106161_large.jpg',
                  description:'iyi Telefon...'
            },
            {
                  name:'Lenovo',
                  price:4000,
                  image:'1-pc.PNG',
                  description:'iyi Pc...'
            },
            {
                  name:'Asus',
                  price:5500,
                  image:'2-pc.PNG',
                  description:'Güzel Pc'
            },
            {
                  name:'Samsung S11',
                  price:7800,
                  image:'samsung-galaxy-a50-akilli-telefon-941e.jpg',
                  description:'iyi Telefon...'
            },
            {
                  name:'LENOVO',
                  price:7700,
                  image:'3-pc.PNG',
                  description:'Güzel Pc'
            },
      ]


      res.render('index', {my_title:'Hello Home Page',products:products})

});



module.exports = router