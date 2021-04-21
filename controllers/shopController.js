const Product = require('../models/productModel')
const Category = require('../models/categoryModel')

//_______________________________________  ANASAYFA ________________________
exports.getIndex = (req,res,next) => {
      const categoryid = req.params.categoryid


      Product.findAll(
          {
              attributes : ['id','name','price','imageUrl'],
          })
          .then( products => {
                Category.findAll()
                    .then((categories) => {
                      res.render('../views/shop/index.ejs', {
                          my_title:'Shopping',
                          products:products,
                          categories:categories,
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


      Product.findAll(
          {
              attributes : ['id','name','price','imageUrl'],
          })
          .then( all_products => {
                Category.findAll()
                    .then((categories) => {
                        res.render('../views/shop/products.ejs', {
                            my_title:'Products Page',
                            products:all_products,
                            categories:categories,
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
        const model = []

        Category.findAll()
            .then((categories) => {
                model.categories = categories
                const category = categories.find(i=> i.id == categoryid)
                return category.getProducts()//istenilen category üzerinden -> ona ait product'ları al.

            })
            .then((products) => { //returnden geleni products olarak karşılıyoruz
                res.render('../views/shop/products.ejs', {
                    my_title:'Products',
                    products:products,
                    categories : model.categories,
                    selectedCategory:categoryid,
                    path:'/products'

                })
            })
            .catch((err) => {
                console.log(err)
            })

}



//_______________________________________  DETAY / TEK ÜRÜN( ID ) ________________________
exports.getProduct = (req,res) => {
        const categoryid = Number(req.params.categoryid)
        // const product = Product.getProductsByCategoryId(categoryid.toString())


        Product.findAll({
            attributes : ['id','name','price','imageUrl','description'],
            where: {id : req.params.productid}
        })
        .then((products) => {
                Category.findAll()
                    .then((categories) => {

                        res.render('shop/product-detail.ejs', {
                            my_title:products[0].name,
                            product:products[0], //objenin kendisi, dizi olmadan gelir -> [0][0] ile..
                            categories : categories,
                            selectedCategory:categoryid,
                            path:'/details'
                        })
                    }).catch((err) => {
                    console.log(err)
                })

            })

        .catch((err) => {
                console.log(err)
            })

}

//_______________________________________  KART  _________________________________
exports.getCart = (req,res) => {

        req.user
            .getCart()
            .then( cart => {
                return cart.getProducts()
                    .then((products) => {
                        console.log(products)
                        res.render('shop/cart', {
                            my_title:'Cart Page',
                            path:'/cart',
                            products:products,

                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
}

exports.postCart = (req,res) => {

        const productId = req.body.productId
        let quantity = 1
        let userCart

        req.user.getCart()
            .then( cart => {
                userCart = cart
                return cart.getProducts( { where : {id:productId}})
            })
            .then(products => {
                let product

                if(products.length > 0){
                    product = products[0]
                }

                if(product) {
                    quantity += product.cartItem.quantity
                    return product
                }

                return Product.findByPk(productId)

            })
            .then( product => {
                    userCart.addProduct(product,{
                        through:{
                            quantity:quantity
                        }
                    })
            })
            .then(() => {
                res.redirect('/cart')
            })
            .catch(err => {
                console.log(err)
            })

}



//_______________________________________  SİPARİŞLERİ GETİR  _________________________________
exports.getOrders = (req,res) => {
      
      res.render('../views/shop/orders.ejs', {
            my_title:'Orders Page',
            path:'/orders'
      })
}





