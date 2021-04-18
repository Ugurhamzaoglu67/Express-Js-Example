const express = require('express')
const app = express()
const adminRoutes= require('./routes/adminRoutes')
const shopRoutes = require('./routes/shopRoutes')
const errorsController = require('./controllers/errors')
const bodyParser = require("body-parser");
const sequelize = require('./utility/database')

app.set('view engine','ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//______________________________ routes ___________________________________
app.use('/admin',adminRoutes);
app.use(shopRoutes);


sequelize
    .authenticate()
    .then(()=> {
          console.log("Başarılı..")
    })
    .catch((err) => {
          console.log(err)
    })




app.use(errorsController.get404Page);

app.listen(3000,() => {
      console.log("3000 port listening")
})