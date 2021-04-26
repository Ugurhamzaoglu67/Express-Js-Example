exports.getLogin = (req,res) => {
    res.render('account/login', {
        path:'/login',
        my_title:'Login Page'
    })
}


exports.postLogin =(req,res) => {
    res.redirect('/')
}

exports.getRegister = (req,res) => {
    res.render('account/register', {
        path:'/register',
        my_title:'Register Page'
    })
}

exports.postRegister = (req,res) => {
    res.redirect('/login')
}


exports.getReset = (req,res) => {
    res.render('account/reset-password', {
        my_title:'Reset Password Page',
        path:'/reset-password'
    })
}

exports.postReset = (req,res) => {
    res.redirect('/login')
}