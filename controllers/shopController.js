const Product = require('../models/productModel')
const Category = require('../models/categoryModel')

//_______________________________________  ANASAYFA ________________________
exports.getIndex = (req,res,next) => {
      const categoryid = req.params.categoryid
      const categories = Category.getAll()

      Product.getAll()
          .then( products => {
                res.render('../views/shop/index.ejs', {
                      my_title:'Shopping',
                      products:products[0],
                      categories:categories,
                      selectedCategory:categoryid,
                      path:'/'
                })

          }).catch((err) => {
                console.log(err)
                  })


}


//_______________________________________  TÜM HEPSİ ________________________
exports.getProducts = (req,res,next) => {
      const categoryid = req.params.categoryid
      const categories = Category.getAll()

      Product.getAll()
          .then( all_products => {
                res.render('../views/shop/products.ejs', {
                      my_title:'Products Page',
                      products:all_products[0],
                      categories:categories,
                      selectedCategory:categoryid,
                      path:'/products'
                })

          }).catch((err) => {
                console.log(err)
              })

}

//_______________________________________  KATEGORİYE GÖRE GETİR ________________________
exports.getProductsByCategoryId = (req,res) => {
      const categoryid = Number(req.params.categoryid)
      const all_products = Product.getProductsByCategoryId(categoryid.toString())
      const categories  = Category.getAll()


      res.render('../views/shop/products.ejs', {
            my_title:'Products',
            products:all_products,
            categories : categories,
            selectedCategory:categoryid,
            path:'/products'

      })


      console.log(typeof categoryid)

}



//_______________________________________  DETAY / TEK ÜRÜN( ID ) ________________________
exports.getProduct = (req,res) => {
      const categoryid = Number(req.params.categoryid)
     const product = Product.getById(req.params.productid)

    // const product = Product.getProductsByCategoryId(categoryid.toString())
      const categories  = Category.getAll()

      res.render('../views/shop/product-detail.ejs', {
            my_title:product.name,
            product:product,
            categories : categories,
            selectedCategory:categoryid,
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
