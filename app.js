const express = require('express')
const app = express()

const admin = require('./routes/admin')
const userRoutes = require('./routes/user')


app.set('view engine','ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

//routes
app.use('/admin',admin.routes);
app.use(userRoutes);


app.use((req,res) => {

      res.status(404).render('404',{my_title:'404 Not Found..'})

});

app.listen(3000,() => {
      console.log("3000 port listening")
})