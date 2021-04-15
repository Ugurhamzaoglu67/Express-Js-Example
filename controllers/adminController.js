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

    const product = Product.getById(req.params.productid)

      res.render('../views/admin/edit-product',{
            my_title:'Ürün Düzenle',
            path:'/admin/products',
            product:product
       
       })
 
 }
//_______________________________________  postEditProduct ________________________
 exports.postEditProduct = (req,res,next)=> {

        const product = Product.getById(req.body.id)

        product.name = req.body.name
        product.price = req.body.price
        product.description = req.body.description
        product.imageUrl = req.body.imageUrl


        Product.Update(product)
        res.redirect('/admin/products')
}