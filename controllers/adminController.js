const Product = require('../models/productModel')
const Category = require('../models/categoryModel')


//_______________________________________  getProducts ________________________
exports.getProducts = (req,res,next) => {

    Product.getAll()
        .then((all_products) => {
            res.render('../views/admin/produtcs.ejs', {
                my_title:'Admin Products',
                products:all_products[0],
                path:'/admin/products',
                my_action: req.query.action //query-> linkin sonundaki QueryString'leri verir.

            })


        }).catch((err) => {
            console.log(err)
             })




    

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
            .then((result) => {
                res.redirect('/')
                console.log("Ürün ekleme başarılı...")
            }).catch((err) => {
                console.log(err)
             })

}

//_______________________________________  getEditProduct ________________________
exports.getEditProduct = (req,res,next) => {
    const categories = Category.getAll()
    const categoryid = Number(req.params.categoryid)

    Product.getById(req.params.productid)
        .then((product) => {
            res.render('admin/edit-product',{
                my_title:'Ürün Düzenle',
                categories:categories,
                selectedCategory:categoryid,
                path:'/admin/products',
                product:product[0][0]

            })
        }).catch((err) => {
            console.log(err)
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