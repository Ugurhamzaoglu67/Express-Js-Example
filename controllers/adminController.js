const Product = require('../models/productModel')
//const Category = require('../models/categoryModel')


//GET
exports.getProducts = (req,res,next) => {

    Product.find()
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

//GET-ADD
exports.getAddProduct = (req,res,next) => {
    res.render('../views/admin/add-product',{
        my_title:'Yeni Ürün',

        path:'/admin/add-product'
 
 })
}

//POST-ADD
 exports.postAddProduct = (req,res,next)=> {

        const name = req.body.name
        const price = req.body.price
        const imageUrl = req.body.imageUrl
        const description = req.body.description

        const product = new Product(
            {
                name:name,
                price : price,
                description: description,
                imageUrl : imageUrl

            }
        )

            product.save()
                .then(() => {
                    console.log("Ekleme başarılı....")
                    res.redirect('/admin/products')
                })
                .catch((err) => {
                    console.log(err)
                })


}

//GET-EDIT
exports.getEditProduct = (req,res,next) => {

    Product.findById(req.params.productid)
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


//POST-EDIT
 exports.postEditProduct = (req,res,next)=> {

        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const imageUrl = req.body.imageUrl

        Product.updateMany( { _id : id},{
            $set : {
                name: name,
                price : price,
                description : description,
                imageUrl : imageUrl
            }
        })
            .then(() => {
                console.log("Güncelleme başarılı")
                res.redirect('/admin/products?action=edit')
            })
            .catch(err => {
                console.log(err)
            })




        /* 2. YÖNTEM id'ye GÖRE GÜNCELLEME
        Product.findById(id)
            .then(product => {
                product.name = name
                product.price = price
                product.description = description
                product.imageUrl = imageUrl

                return product.save()

            }) .then(() => {

                console.log("Güncelleme başarılı")
                res.redirect('/admin/products?action=edit')
                 })
                .catch((err) => {
                    console.log(err)
                })
                */
 }


//POST-DELETE
exports.postDeleteProduct = (req,res) => {

        const id = req.body.productid

        //2.yöntem
        Product.findByIdAndRemove(id)
            .then(() => {
                res.redirect('/admin/products?action=delete')
            })

            .catch((err) => {
                console.log(err)
            })

}