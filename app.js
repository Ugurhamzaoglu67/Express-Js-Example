const express = require('express')
const app = express()

const adminRoutes= require('./routes/adminRoutes')
const shopRoutes = require('./routes/shopRoutes')
const errorsController = require('./controllers/errors')

app.set('view engine','ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

//routes
app.use('/admin',adminRoutes);
app.use(shopRoutes);


app.use(errorsController.get404Page);

app.listen(3000,() => {
      console.log("3000 port listening")
})