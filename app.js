const express = require('express')
const app = express()
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


require('dotenv').config()

const ConnectionString = `mongodb+srv://craxx3131:${process.env.PASSWORD}@btkapp.in0gt.mongodb.net/node-appDB?retryWrites=true&w=majority`


//_________________________________________________________________


const store = new mongoDbStore({
    uri:ConnectionString,
    collection:'mySessions'
})


app.set('view engine','ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
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




mongoose.connect(ConnectionString)
        .then(() => {
            console.log('Bağlantı gerçekleşti....')
            app.listen(3000)
        })
        .catch(err => {
             console.log(err)
         })

