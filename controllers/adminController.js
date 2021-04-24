const Product = require('../models/productModel')
const Category = require('../models/categoryModel')


//GET ALL  PRODUCTS
exports.getProducts = (req,res,next) => {

    Product.find()
        .populate('userId','name -_id')
        .select('name price imageUrl userId ')
        .then((all_products) => {
            console.log(all_products)
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

//GET ADD PRODUCT
exports.getAddProduct = (req,res,next) => {
    res.render('../views/admin/add-product',{
        my_title:'Yeni Ürün',

        path:'/admin/add-product'
 
 })
}

//POST ADD PRODUCT
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
                imageUrl : imageUrl,
                userId : req.user

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

//GET EDIT ONE PRODUCT
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

// GET ADD CATEGORY
exports.getAddCategory = (req,res) => {
    res.render('admin/add-category',{
        my_title:"Yeni Kategori",
        path:'/admin/add-category'
    })

}

// POST CATEGORY
exports.postAddCategory = (req,res) => {
    const name = req.body.name
    const description = req.body.description

    const category = new Category({
        name : name,
        description:description
    })

    category.save()
        .then(() => {

            res.redirect('/admin/categories?action=create')
        })
        .catch(err => {
            console.log(err)
        })
}

// GET CATEGORIES
exports.getCategories = (req,res) => {

    Category.find()
        .then(categories => {
            res.render('../views/admin/categories.ejs', {
                my_title:'Categories',
                path:'/admin/categories',
                categories:categories,
                my_action:req.query.action
            })
        })
        .catch(err => {
            console.log(err)
        })
}


// GET EDIT CATEGORY
exports.getEditCategory = (req,res) => {
    Category.findById(req.params.categoryid)
        .then((category) => {
            res.render('../views/admin/edit-category.ejs',{
                my_title:'Edit Category',
                path:'/admin/edit-category',
                category:category
            })
        })
        .catch(err => {
            console.log(err)
        })
}


// POST EDIT CATEGORY
exports.postEditCategory = (req,res) => {

    const id = req.body.id
    const name = req.body.name
    const description = req.body.description

    Category.findById(id)//id bilgisi ilen gelen category'i alalım
        .then(category => {
            category.name = name
            category.description = description

            return category.save()
        })
        .then(() => {
            res.redirect('/admin/categories?action=edit')
        })
        .catch(err => {
            console.log(err)
        })
}



exports.postDeleteCategory = (req,res) => {
    const id = req.body.categoryid

    Category.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/admin/categories?action=delete')
        })
        .catch(err => {
            console.log(err)
        })

}