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

        const categoryid = Number(req.params.categoryid)

        res.render('../views/admin/add-product',{
            my_title:'Yeni Ürün',
            //categories:categories[0],
            //selectedCategory:categoryid,
            path:'/admin/add-product'

        })
 
 }
//_______________________________________  postAddProduct ________________________
 exports.postAddProduct = (req,res,next)=> {

        const name = req.body.name
        const price = req.body.price
        const imageUrl = req.body.imageUrl
        const description = req.body.description

        /* 1.YÖNTEM ÜRÜN EKLEME
        Product.create({
            name:name,
            price:price,
            imageUrl:imageUrl,
            description:description
        })
            .then((result) => {
                console.log(result)
            })
            .catch((err) => {
                console.log(err)
            })

        */

       // const categoryid = req.body.categoryid


        /*2.YÖNTEM */

         const prd = Product.build({
             name:name,
             price:price,
             imageUlr:imageUrl,
             description:description
         })

         prd.save()
             .then((result) => {
                 console.log(result)
                 res.redirect('/')
             })
             .catch((err) => {
                 console.log(err)
             })




}

//_______________________________________  getEditProduct ________________________
exports.getEditProduct = (req,res,next) => {

    const categoryid = Number(req.params.categoryid)

    Product.getById(req.params.productid)
        .then((product) => {
            Category.getAll()
                .then((categories) => {
                    res.render('admin/edit-product',{
                        my_title:'Ürün Düzenle',
                        categories:categories[0],
                        selectedCategory:categoryid,
                        path:'/admin/products',
                        product:product[0][0]
                })
            }).catch((err) => {
                console.log(err)
            })


        }).catch((err) => {
            console.log(err)
    })




 
 }
//_______________________________________  postEditProduct ________________________
 exports.postEditProduct = (req,res,next)=> {

       const product = new Product()
        product.id = req.body.id
        product.name = req.body.name
        product.price = req.body.price
        product.description = req.body.description
        product.imageUrl = req.body.imageUrl
        product.categoryid = req.body.categoryid

        Product.Update(product)
            .then(() => {
                res.redirect('/admin/products?action=edit&id='+product.id)
                console.log("Güncelleme başarılı...")

            }).catch((err) => {
                console.log(err)
                 })

}

exports.postDeleteProduct = (req,res) => {

      Product.DeleteById(req.body.productid)
          .then((product) => {

              res.redirect('/admin/products?action=delete')
              console.log(`Silme başarılı. Silinen ID : ${req.body.productid}`)


          })
          .catch((err) => {
              console.log(err)
          })



}