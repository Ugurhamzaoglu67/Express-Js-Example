const express = require('express')
const app = express()

const adminRoutes= require('./routes/admin')
const userRoutes = require('./routes/user')
const errorsController = require('./controllers/errors')

app.set('view engine','ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

//routes
app.use('/admin',adminRoutes);
app.use(userRoutes);


app.use(errorsController.get404Page);

app.listen(3000,() => {
      console.log("3000 port listening")
})