const Product = require('../models/productModel')


//_______________________________________  ANASAYFA ________________________
exports.getIndex = (req,res,next) => {
      const all_products = Product.getAll()

      res.render('../views/shop/index.ejs', {
            my_title:'Shopping',
            products:all_products,
            path:'/'
      })
}


//_______________________________________  TÜM HEPSİ ________________________
exports.getProducts = (req,res,next) => {

      const all_products = Product.getAll()

      res.render('../views/shop/products.ejs', {
            my_title:'Products Page',
            products:all_products,
            path:'/products'
      
      })
}


//_______________________________________  TEK ÜRÜN( ID ) ________________________
exports.getProduct = (req,res,next) => {

      const product = Product.getById(req.params.productid)

      res.render('../views/shop/product-detail.ejs', {
            my_title:product.name,
            product:product,
            path:'/products'
      })


}



//_______________________________________  DETAYLARI GETİR ________________________
exports.getProductDetails = (req,res) => {
      res.render('../views/shop/details', {
            my_title:'Details Page',
            path:'/details'
      })
}

//_______________________________________  KART  _________________________________
exports.getCart = (req,res) => {
      res.render('../views/shop/cart', {
            my_title:'Cart Page',
            path:'/cart'
      })
}

//_______________________________________  SİPARİŞLERİ GETİR  _________________________________
exports.getOrders = (req,res) => {
      
      res.render('../views/shop/orders.ejs', {
            my_title:'Orders Page',
            path:'/orders'
      })
}

