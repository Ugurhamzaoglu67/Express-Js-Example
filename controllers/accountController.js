exports.getLogin = (req,res) => {
    res.render('account/login', {
        path:'/login',
        my_title:'Login Page',
        isAuthenticated:req.isAuthenticated
    })
}


exports.postLogin =(req,res) => {

    const email = req.body.email
    const password = req.body.password

    if((email=='ugur@gmail.com') && (password=='12345')){
        req.isAuthenticated=true
        res.redirect('/')
    }
    else {
        req.isAuthenticated=false
        res.redirect('/login')
    }




}

exports.getRegister = (req,res) => {
    res.render('account/register', {
        path:'/register',
        my_title:'Register Page',
        isAuthenticated:req.isAuthenticated
    })
}

exports.postRegister = (req,res) => {
    res.redirect('/login')
}


exports.getReset = (req,res) => {
    res.render('account/reset-password', {
        my_title:'Reset Password Page',
        path:'/reset-password',
        isAuthenticated:req.isAuthenticated
    })
}

exports.postReset = (req,res) => {
    res.redirect('/login')
}