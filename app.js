const express = require('express')
const app = express()
const adminRoutes= require('./routes/adminRoutes')
const shopRoutes = require('./routes/shopRoutes')

const errorsController = require('./controllers/errors')
const bodyParser = require("body-parser");
const mongoose = require('mongoose')





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



mongoose.connect('mongodb+srv://craxx3131:sarman6767@btkapp.in0gt.mongodb.net/node-appDB?retryWrites=true&w=majority')
        .then(() => {
        console.log('Bağlantı gerçekleşti....')
            app.listen(3000)
        })
        .catch(err => {
        console.log(err)
            })


