const Product = require('../models/productModel')
const Category = require('../models/categoryModel')

//_______________________________________  ANASAYFA ________________________
exports.getIndex = (req,res,next) => {
      const categoryid = req.params.categoryid


      Product.getAll()
          .then( products => {
                Category.getAll()
                    .then((categories) => {
                      res.render('../views/shop/index.ejs', {
                          my_title:'Shopping',
                          products:products[0],
                          categories:categories[0],
                          selectedCategory:categoryid,
                          path:'/'
                      })
              }).catch((err) => {
                    console.log(err)
                })

          }).catch((err) => {
                console.log(err)
                  })


}


//_______________________________________  TÜM HEPSİ ________________________
exports.getProducts = (req,res,next) => {
      const categoryid = req.params.categoryid


      Product.getAll()
          .then( all_products => {
                Category.getAll()
                    .then((categories) => {
                        res.render('../views/shop/products.ejs', {
                            my_title:'Products Page',
                            products:all_products[0],
                            categories:categories[0],
                            selectedCategory:categoryid,
                            path:'/products'
                        })
                    }).catch((err) => {
                    console.log(err)
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
        // const product = Product.getProductsByCategoryId(categoryid.toString())
        const categories  = Category.getAll()

        Product.getById(req.params.productid)
            .then((product) => {
                console.log(product[0][0])

                res.render('shop/product-detail.ejs', {
                    my_title:product[0][0].name,
                    product:product[0][0], //objenin kendisi, dizi olmadan gelir -> [0][0] ile..
                    categories : categories,
                    selectedCategory:categoryid,
                    path:'/details'
                })

            }).catch((err) => {
                console.log(err)
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
