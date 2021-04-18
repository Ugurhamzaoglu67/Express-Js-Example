const express = require('express')
const app = express()
const adminRoutes= require('./routes/adminRoutes')
const shopRoutes = require('./routes/shopRoutes')
const errorsController = require('./controllers/errors')
const bodyParser = require("body-parser");

const sequelize = require('./utility/database')

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

//______________________________ sequelize ___________________________________
sequelize.sync()
    .then((result) => {
          console.log(result)
    })
    .catch((err) => {
          console.log(err)
    })



app.listen(3000,() => {
      console.log("3000 port listening")
})