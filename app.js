const express = require('express')
const app = express()
const path = require('path')
//_________________________________ ROUTES ____________________________
const adminRoutes= require('./routes/adminRoutes')
const shopRoutes = require('./routes/shopRoutes')
const accountRoutes = require('./routes/accountRoutes.js')

const errorsController = require('./controllers/errors')
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const User = require('./models/userModel')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoDbStore = require('connect-mongodb-session')(session)
const isAuthenticated = require('./middleware/authentication.js')
const csurf = require('csurf')
const multer = require('multer')


require('dotenv').config()

const ConnectionString = `mongodb+srv://craxx3131:${process.env.PASSWORD}@btkapp.in0gt.mongodb.net/node-appDB?retryWrites=true&w=majority`


//_________________________________________________________________


const store = new mongoDbStore({
    uri:ConnectionString,
    collection:'mySessions'
})

const storage = multer.diskStorage({
    destination : function(req, file, cb)  {
            cb(null,'./public/img')

    },
    filename : function (req, file, cb) {
        cb(null, file.fieldname + '-' +Date.now() + path.extname(file.originalname))
    }

})
app.set('view engine','ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false })) //Normal text dataları ele alır.
app.use(multer({
    storage:storage
}).single('imageUrl')) //Multer üzerinden tek
app.use(bodyParser.json())
app.use(cookieParser())

app.use(session({
    secret:'mysecret',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:3600000
    },
    store:store

}))

app.use((req,res,next) => {

        if(!req.session.user){
            return next()
        }


        User.findById(req.session.user._id)
            .then(user => {
                req.user = user
                next()
            })
            .catch(err => {
                console.log(err)
            })
})



app.use(csurf({ cookie: true }))
//______________________________ routes ___________________________________
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(accountRoutes)
app.use('/500',errorsController.get500page)
app.use(errorsController.get404Page);

/*  -&
    BU ŞEKİLDE AYRI SAYFAYA REQUEST OLMAZ ,
    DİREK AYNI  SAYFAYA RENDER EDER
    */
app.use((error,req,res,next) =>{
    res.status(500).render('error/500',{
        my_title:'ERROR',
        path:'ERROR',
        isAuthenticated:req.session.isAuthenticated,
        user:req.user,
        isAdmin:req.user.isAdmin
    })

})

/*  end &  */


mongoose.connect(ConnectionString)
        .then(() => {
            console.log('Bağlantı gerçekleşti....')
            app.listen(3000)
        })
        .catch(err => {
             console.log(err)
         })

