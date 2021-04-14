const Product = require('../models/productModel')



//_______________________________________  getProducts ________________________
exports.getProducts = (req,res,next) => {

      const all_products = Product.getAll()
      res.render('../views/admin/produtcs.ejs', {
            my_title:'Admin Products',
            products:all_products,
            path:'/admin/products'
      
      })

}
//_______________________________________  getAddProduct ________________________
exports.getAddProduct = (req,res,next) => {

      res.render('../views/admin/add-product',{
            my_title:'Yeni Ürün',
            path:'/admin/add-product'
       
       })
 
 }
//_______________________________________  postAddProduct ________________________
 exports.postAddProduct = (req,res,next)=> {

      const product = new Product(
            req.body.name, 
            req.body.price,
            req.body.imageUrl, 
            req.body.description )


      product.saveProduct()
      res.redirect('/')
}

//_______________________________________  getEditProduct ________________________
exports.getEditProduct = (req,res,next) => {

      res.render('../views/admin/edit-product',{
            my_title:'Ürün Düzenle',
            path:'/admin/edit-product'
       
       })
 
 }
//_______________________________________  postEditProduct ________________________
 exports.postEditProduct = (req,res,next)=> {

      res.redirect('/')
}