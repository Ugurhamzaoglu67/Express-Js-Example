const Product = require('../models/productModel')
const Category = require('../models/categoryModel')


//_______________________________________  getProducts ________________________
exports.getProducts = (req,res,next) => {


        const all_products = Product.getAll()

      res.render('../views/admin/produtcs.ejs', {
            my_title:'Admin Products',
            products:all_products,

            path:'/admin/products',
            my_action: req.query.action //query-> linkin sonundaki QueryString'leri verir.
           
      })

  
      console.log(req.query)

    

}
//_______________________________________  getAddProduct ________________________
exports.getAddProduct = (req,res,next) => {
        const categories = Category.getAll()
        const categoryid = Number(req.params.categoryid)
        res.render('../views/admin/add-product',{
            my_title:'Yeni Ürün',
            categories:categories,
            selectedCategory:categoryid,
            path:'/admin/add-product'
       
       })
 
 }
//_______________________________________  postAddProduct ________________________
 exports.postAddProduct = (req,res,next)=> {

        const product = new Product()

        product.name = req.body.name
        product.price = req.body.price
        product.categoryid = req.body.categoryid
        product.imageUrl = req.body.imageUrl
        product.description = req.body.description

        product.saveProduct()
        res.redirect('/')
}

//_______________________________________  getEditProduct ________________________
exports.getEditProduct = (req,res,next) => {
    const product = Product.getById(req.params.productid)
    const categories = Category.getAll()
    const categoryid = Number(req.params.categoryid)


      res.render('../views/admin/edit-product',{
            my_title:'Ürün Düzenle',
            categories:categories,
            selectedCategory:categoryid,
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
        product.categoryid = req.body.categoryid

        Product.Update(product)
        res.redirect('/admin/products?action=edit&id='+product.id)
}

exports.postDeleteProduct = (req,res) => {

      Product.DeleteById(req.body.productid) // models -> productModel.js  içine bu method ve id gidicek
      res.redirect('/admin/products?action=delete')


}