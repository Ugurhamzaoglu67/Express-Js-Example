const express = require('express')
const app = express()
const adminRoutes= require('./routes/adminRoutes')
//const shopRoutes = require('./routes/shopRoutes')

const errorsController = require('./controllers/errors')
const bodyParser = require("body-parser");
const mongoConnect = require('./utility/database.js').mongoConnect

//_________________________________________________________________

app.set('view engine','ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//______________________________ routes ___________________________________
 app.use('/admin',adminRoutes);
// app.use(shopRoutes);
// app.use(errorsController.get404Page);

mongoConnect(() => {
      app.listen(3000)

})

