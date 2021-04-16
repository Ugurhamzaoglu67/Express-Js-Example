const Product = require('../models/productModel')
const Category = require('../models/categoryModel')

//_______________________________________  ANASAYFA ________________________
exports.getIndex = (req,res,next) => {
      const all_products = Product.getAll()
      const categories = Category.getAll()

      res.render('../views/shop/index.ejs', {
            my_title:'Shopping',
            products:all_products,
            categories:categories,
            path:'/'
      })
}


//_______________________________________  TÜM HEPSİ ________________________
exports.getProducts = (req,res,next) => {

      const all_products = Product.getAll()
      const categories = Category.getAll()


      res.render('../views/shop/products.ejs', {
            my_title:'Products Page',
            products:all_products,
            categories:categories,
            path:'/products'
      
      })
}

//_______________________________________  KATEGORİYE GÖRE GETİR ________________________
exports.getProductsByCategoryId = (req,res) => {
      const categoryid = req.params.categoryid
      const all_products = Product.getProductsByCategoryId(categoryid)
      const categories  = Category.getAll()


      res.render('../views/shop/products.ejs', {
            my_title:'Products',
            products:all_products,
            categories : categories,
            path:'/products'

      })

}



//_______________________________________  DETAY / TEK ÜRÜN( ID ) ________________________
exports.getProduct = (req,res) => {

     const product = Product.getById(req.params.productid)
      const categoryid = req.params.categoryid
     // const product = Product.getProductsByCategoryId(categoryid)
      const categories  = Category.getAll()

      res.render('../views/shop/product-detail.ejs', {
            my_title:product.name,
            product:product,
            categories : categories,
            path:'/products'
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





//_______________________________________  (FAZLALIK)DETAYLARI GETİR  ________________________
// exports.getProductDetails = (req,res) => {
//
//       res.render('../views/shop/details', {
//             my_title:'Details Page',
//             path:'/details'
//       })
// }
