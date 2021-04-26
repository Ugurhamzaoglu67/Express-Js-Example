const User = require('../models/userModel')
const bcrypt = require('bcrypt')

//______________________________________ Login () ________________________
exports.getLogin = (req,res) => {
    res.render('account/login', {
        path:'/login',
        my_title:'Login Page',
        isAuthenticated:req.session.isAuthenticated
    })
}

exports.postLogin =(req,res) => {

    const email = req.body.email
    const password = req.body.password

    User.findOne({email:email})
        .then(user =>{
            if(!user) {
                return res.redirect('/login')
            }

            bcrypt.compare(password,user.password)
                .then(isSuccess => {
                    if(isSuccess){
                        req.session.user = user
                        req.session.isAuthenticated = true

                        return  req.session.save((err) => {
                            console.log(err)
                            res.redirect('/')
                        })

                    }
                    res.redirect('/login')
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })

}
//______________________________________ Register () ________________________
exports.getRegister = (req,res) => {
    res.render('account/register', {
        path:'/register',
        my_title:'Register Page',
        isAuthenticated:req.session.isAuthenticated
    })
}

exports.postRegister = (req,res) => {

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    //Mail bilgisine göre kullanıcıyı sorgulamak
    User.findOne({email:email})
        .then(user => {
            if(user){
                return res.redirect('/register') //return ile register'den sonra kodlar aşağı gitmesinki, işlemi burda keselim
            }

            return bcrypt.hash(password,10)
        })
        .then((hashedPassword)=> {
            console.log(hashedPassword)
                const newUser = new User({
                    name:name,
                    email:email,
                    password:hashedPassword,
                    cart:{ items: [] }
                })
                return newUser.save()
        })
        .then( ()=> {
            res.redirect('/login')
         })
        .catch(err => {
            console.log(err)
        })

}

//______________________________________ Reset () ________________________
exports.getReset = (req,res) => {
    res.render('account/reset-password', {
        my_title:'Reset Password Page',
        path:'/reset-password',
        isAuthenticated:req.session.isAuthenticated
    })
}

exports.postReset = (req,res) => {
    res.redirect('/login')
}