const Product = require('../models/productModel')



exports.getIndex = (req,res,next) => {
      const all_products = Product.getAll()

      res.render('../views/shop/index.ejs', {
            my_title:'Shopping',
            products:all_products,
            path:'/'
      })
}


//_______________________________________  getProducts ________________________
exports.getProducts = (req,res,next) => {

      const all_products = Product.getAll()

      res.render('../views/shop/products', {
            my_title:'Products Page',
            products:all_products,
            path:'/products'
      
      })

}

//_______________________________________  getProductDetails ________________________
exports.getProductDetails = (req,res) => {
      res.render('../views/shop/details', {
            my_title:'Details Page',
            path:'/details'
      })
}

//_______________________________________  getCart _________________________________
exports.getCart = (req,res) => {
      res.render('../views/shop/cart', {
            my_title:'Cart Page',
            path:'/cart'
      })
}

//_______________________________________  getOrders _________________________________
exports.getOrders = (req,res) => {
      
      res.render('../views/shop/orders.ejs', {
            my_title:'Orders Page',
            path:'/orders'
      })
}

