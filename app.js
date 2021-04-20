const express = require('express')
const app = express()
const adminRoutes= require('./routes/adminRoutes')
const shopRoutes = require('./routes/shopRoutes')
const errorsController = require('./controllers/errors')
const bodyParser = require("body-parser");

const sequelize = require('./utility/database')

const Category = require('./models/categoryModel')
const Product = require('./models/productModel')
const User = require('./models/userModel')

//_________________________________________________________________

app.set('view engine','ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//______________________________ routes ___________________________________
app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404Page);

//_____________ Db İlişkileri_______________________________________

Product.belongsTo(Category, {
    foreignKey: {
        allowNull:false
    }

}) //1 ürün -> 1 kategoriye ait
Category.hasMany(Product) // 1 Kategori -> Çokça ürüne ait


Product.belongsTo(User) //1-ürün sadece 1 kullanıcı tarafından
User.hasMany(Product) //1 user sınırsız Ürün




// _________________ sequelize ___________________________________
sequelize
    .sync({force:true}) //Tabloları ilk başta drop et, yeni yapıya göre oluştur.
    //.sync()
    .then(() => {

        User.findByPk(1)
            .then((user) => {
                if(!user) {
                    User.create({
                        name:'Ugur hmz',
                        email:'test@gmail.com'
                    })
                }

                return user

            }).then((user) => {

                    Category.count()
                        .then( count => {
                            if(count === 0){
                                Category.bulkCreate([
                                    {name:'Telefon',description:'Telefon Kategorisi'},
                                    {name:'Bilgisayarlar',description:'Laptop & Masa Üstü Bilgisayarlar'},
                                    {name:'Beyaz Eşyalar', description:'Adan z ye Beyaz eşyalar'},
                                    {name:'Elektronik', description:'Elektronik Aletler'}
                                ])
                            }
                        })
                })

    })
    .catch((err) => {
          console.log(err)
    })



app.listen(3000,() => {
      console.log("3000 port listening")
})