const Product = require('../models/productModel')
//const Category = require('../models/categoryModel')


//_______________________________________  getProducts ________________________
exports.getProducts = (req,res,next) => {

    Product.findAll()
        .then((all_products) => {
            res.render('../views/admin/produtcs.ejs', {
                my_title:'Admin Products',
                products:all_products,
                path:'/admin/products',
                my_action: req.query.action //query-> linkin sonundaki QueryString'leri verir.

            })



        }).catch((err) => {
            console.log(err)
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

        const name = req.body.name
        const price = req.body.price
        const imageUrl = req.body.imageUrl
        const description = req.body.description

        const product = new Product(name,price,description,imageUrl)

            product.save()
                .then((result) => {
                    console.log("Ekleme başarılı....")
                    res.redirect('/admin/products')
                })
                .catch((err) => {
                    console.log(err)
                })


}

//_______________________________________  getEditProduct ________________________
exports.getEditProduct = (req,res,next) => {
    console.log(req.params.productid)
    Product.findById(req.params.productid)
        // .then(products => {
        //     console.log(products[0])
        //     res.render('admin/edit-product', {
        //         my_title: 'Ürün Düzenle',
        //         path: '/admin/products',
        //         product: products[0] 1. Yöntem için geçerliydi
        //     })
        // })

        //2.YÖNTEM İÇİN
        .then(product => {
            res.render('admin/edit-product', {
                        my_title: 'Ürün Düzenle',
                        path: '/admin/products',
                        product: product
                     })
         })
        .catch(err => {
            console.log(err)
        })
 }


//_______________________________________  postEditProduct ________________________
 exports.postEditProduct = (req,res,next)=> {

        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const imageUrl = req.body.imageUrl
       // const categoryid = req.body.categoryid

       const product = new Product(name, price,description, imageUrl,id)

           product.save()
            .then(() => {

                console.log("Güncelleme başarılı")
                res.redirect('/admin/products?action=edit')
            })
            .catch((err) => {
                console.log(err)
            })
}


exports.postDeleteProduct = (req,res) => {

        const id = req.body.productid

        //2.yöntem
        Product.deleteById(id)
            .then(() => {

                res.redirect('/admin/products?action=delete')
            })

            .catch((err) => {
                console.log(err)
            })

}