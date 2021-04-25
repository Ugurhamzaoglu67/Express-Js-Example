const Product = require('../models/productModel')
const Category = require('../models/categoryModel')

//_______________________________________  ANASAYFA ________________________
exports.getIndex = (req,res) => {

      Product.find()
          .then( products => {
                return products
          })
          .then(products => {
              Category.aggregate([
                  {
                      $lookup:{
                          from:'products',
                          localField:'_id',
                          foreignField:'categories',
                          as:'products'
                      }
                  },
                  {
                      $project:{
                          _id:1,
                          name:1,
                          num_of_products:{$size:'$products'}
                      }
                  }
              ]).then(categories => {
                      res.render('../views/shop/index.ejs', {
                          my_title:'Shopping',
                          products:products,
                          path:'/',
                          categories:categories
                      })

                  })
          })

          .catch((err) => {
                console.log(err)
                  })

}

//_______________________________________  TÜM HEPSİ ________________________
exports.getProducts = (req,res) => {

      Product.find()
          .then( all_products => {
              return all_products
          })
          .then(all_products => {
              Category.aggregate([
                  {
                      $lookup:{
                          from:'products',
                          localField:'_id',
                          foreignField:'categories',
                          as:'products'
                      }
                  },
                  {
                      $project:{
                          _id:1,
                          name:1,
                          num_of_products:{$size:'$products'}
                      }
                  }
              ]).then(categories => {
                      res.render('../views/shop/products.ejs', {
                          my_title:'Products Page',
                          products:all_products,
                          path:'/products',
                          categories:categories
                      })

                  })
          })
          .catch((err) => {
                console.log(err)
              })
}

//_______________________________________  KATEGORİYE GÖRE GETİR ________________________
exports.getProductsByCategoryId = (req,res) => {
        const categoryid = req.params.categoryid
        const model = []

        Category.find()
            .then((categories) => {
                model.categories = categories
                return Product.find({
                    categories:categoryid
                })

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

       Product
        //.findById(req.params.productid)
           .findOne( {_id : req.params.productid} )
        .then((product) => {
            res.render('shop/product-detail.ejs', {
                my_title:product.name,
                product:product, //objenin kendisi, dizi olmadan gelir -> [0][0] ile..
                path:'/details'
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
            .then( (result) => {
                res.redirect('/cart')
            })
            .catch(err => {
                console.log(err)
            })

}

//_______________________________________  KARTTAN Sİl  _________________________________

exports.postCartItemDelete = (req,res) => {
        const productid = req.body.productid
        req.user.getCart() //Usere bağlı olan o 'anki kartı aldık

            .then( cart => {
                return cart.getProducts( {where : {id : productid }})  //Bu kartlar arasından-> seçmiş olduğumu bir sonraki thene

            }) //Kart bilgisini then'de karşıladık

            .then(products => {
                const product = products[0]
                return product.cartItem.destroy()

            })
            .then((result) => {
                res.redirect('/cart')
            })

}


//_______________________________________  SİPARİŞLERİ GETİR  _________________________________
exports.getOrders = (req,res) => {





      
    req.user.getOrders({ include : ['products']}) //Bana ilişkili olan productlarıda getir
        .then(orders => {
            console.log(orders)
            
        res.render('../views/shop/orders.ejs', {
            my_title:'Orders Page',
            path:'/orders',
            orders:orders,

            })


        }).catch(err => {
            console.log(err)
        })

}

exports.postOrder = (req,res) => {
    let userCart
        req.user.getCart()
            .then(cart => {
                userCart = cart
                return cart.getProducts()
            }).then(products => {
                return req.user.createOrder()
                    .then(order => {
                            order.addProducts(products.map(product => {
                                product.orderItem = {
                                    quantity:product.cartItem.quantity,
                                    price:product.price
                                }

                                return product

                            }))

                    }).catch((err) => {
                        console.log(err)
                })
            })
            .then(() => {
                userCart.setProducts(null)
            })
            .then(() => {
                res.redirect('/orders')
            })

            .catch((err) => {
                console.log(err)
            })
}