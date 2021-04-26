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
        ])
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
        .populate('cart.items.productId')
        .execPopulate() //Sorguyu tekrar db'ye gönderip, yukarda ilişkili olan datayı  burdan alalım
        .then(user => {
            res.render('../views/shop/cart.ejs', {
                title: 'Cart',
                path: '/cart',
                products: user.cart.items,
                my_title:'Cart'
            });
        }).catch(err => {
        console.log(err);
    });
}

exports.postCart = (req,res) => {

        const productId = req.body.productId


        Product.findById(productId)
            .then(product => {
                return req.user.addToCart(product)
            })
            .then(() => {
                res.redirect('/cart')
            })
            .catch(err => {
                console.log(err)
            })

}

//_______________________________________  KARTTAN Sİl  _________________________________

exports.postCartItemDelete = (req,res) => {
        const productid = req.body.productid
       req.user.deleteCartItem(productid)
           .then(() => {
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