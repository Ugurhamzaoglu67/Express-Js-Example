const Product = require('../models/productModel')
const Category = require('../models/categoryModel')


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

        const categoryid = Number(req.params.categoryid)

        Category.findAll()
            .then((categories) => {
                res.render('../views/admin/add-product',{
                    my_title:'Yeni Ürün',
                    categories:categories,
                    selectedCategory:categoryid,
                    path:'/admin/add-product'

                })
            }).catch((err) => {
            console.log(err)
        })
 
 }
//_______________________________________  postAddProduct ________________________
 exports.postAddProduct = (req,res,next)=> {

        const name = req.body.name
        const price = req.body.price
        const imageUrl = req.body.imageUrl
        const description = req.body.description
        const categoryid = req.body.categoryid

        Product.create({
            name:name,
            price:price,
            imageUrl:imageUrl,
            description:description,
            categoryId:categoryid
        })
            .then((result) => {
                console.log("Ekleme başarılı....")
                res.redirect('/')
            })
            .catch((err) => {
                console.log(err)
            })





}

//_______________________________________  getEditProduct ________________________
exports.getEditProduct = (req,res,next) => {

    const categoryid = Number(req.params.categoryid)

    Product.findByPk(req.params.productid)
        .then((product) => {

            if(!product){
                return res.redirect('/')
            }
            Category.findAll()
                .then((categories) => {
                    res.render('admin/edit-product',{
                        my_title:'Ürün Düzenle',
                        categories:categories,
                        selectedCategory:categoryid,
                        path:'/admin/products',
                        product:product
                })
                })
                .catch((err) => {
                    console.log(err)
                     })

                })
                .catch((err) => {
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
        const categoryid = req.body.categoryid

        Product.findByPk(id)
            .then((product) => {
                product.name = name
                product.price = price
                product.description = description
                product.imageUrl = imageUrl
                product.categoryId= categoryid

                return product.save() //Obje güncellenir.
            })
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
        Product.findByPk(id)
            .then( product => { //Bize product gelecek
               return product.destroy()
            })
            .then((result) => {
                console.log("Product has been deleted")
                res.redirect('/admin/products?action=delete')
            })

            .catch((err) => {
                console.log(err)
            })



        // 1.yöntem
        // Product.destroy(
        //     {
        //         where:{id:id}
        //     }
        // )
        //     .then(()=> {
        //         res.redirect('/admin/products?action=delete')
        //         console.log(`Silme başarılı. Silinen ID : ${id}`)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })




}