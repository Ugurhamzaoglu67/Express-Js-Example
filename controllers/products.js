const Product = require('../models/productModel')


exports.getProducts = (req,res,next) => {

      const all_products = Product.getAll()



      res.render('index', {
            my_title:'Hello Home Page',
            products:all_products,
            path:'/'
      
      })

}

exports.getAddProduct = (req,res,next) => {

      res.render('add-product',{
            my_title:'Ürün Ekleme Sayfası',
            path:'/admin/add-product'
       
       })
 
 }

 exports.postAddProduct = (req,res,next)=> {

      const product = new Product(
            req.body.name, 
            req.body.price,
            req.body.imageUrl, 
            req.body.description )


      product.saveProduct()
      res.redirect('/')
}