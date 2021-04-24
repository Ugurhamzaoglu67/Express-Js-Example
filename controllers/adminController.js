const Product = require('../models/productModel')
//const Category = require('../models/categoryModel')


//_______________________________________  getProducts ________________________
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

//_______________________________________  getEditProduct ________________________
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


//_______________________________________  postEditProduct ________________________
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