const User = require('../models/userModel')

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

    if((email=='ugur@gmail.com') && (password=='12345')){
        //req.isAuthenticated=true
        //res.cookie('isAuthenticated',true)
        req.session.isAuthenticated=true
        res.redirect('/')
    }
    else {
        req.isAuthenticated=false
        res.redirect('/login')
    }

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
            }else {
                const newUser = new User({
                    name:name,
                    email:email,
                    password:password,
                    cart:{ items: [] }
                })

               return newUser.save()
            }
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