const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

//______________________________________ Login () ________________________
exports.getLogin = (req,res) => {
    let errorMessage = req.session.errorMessage;
    delete req.session.errorMessage //Session Sıfırlama Sayfa gönderdikten sonra

    res.render('account/login', {
        path:'/login',
        my_title:'Login Page',
        errorMessage:errorMessage
        
    })
}

exports.postLogin =(req,res) => {

    const email = req.body.email
    const password = req.body.password

    User.findOne({email:email})
        .then(user =>{
            if(!user) {
                req.session.errorMessage = "Bu Mail adresi ile ilgili bir kayıt bulunamamıştır."
                req.session.save((err) => {
                    console.log(err)
                    return res.redirect('/login')
                })

            }

            bcrypt.compare(password,user.password)
                .then(isSuccess => {
                    if(isSuccess){
                        req.session.user = user
                        req.session.isAuthenticated = true

                        return  req.session.save((err) => {
                            console.log(err)

                            const url =req.session.redirectTo || '/';
                            delete req.session.redirectTo
                            return res.redirect(url)
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
    const errorMessage = req.session.errorMessage
    delete req.session.errorMessage

    res.render('account/register', {
        path:'/register',
        my_title:'Register Page',
        errorMessage:errorMessage
        

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

            req.session.errorMessage = "Bu Mail adresi ile daha öne kayıt olunmuş."
            req.session.save((err) => {
                console.log(err)
                return res.redirect('/register') //return ile register'den sonra kodlar aşağı gitmesinki, işlemi burda keselim

            })

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

            let transporter= nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:'ugur.hmz52@gmail.com',
                    pass:process.env.EMAIL_PASS
                }
            })


            let mailOptions = {
                from:'ugur.hmz52@gmail.com',
                to:`${email}`,
                subject:'Hesap Başarılı bir şekilde oluşturuldu',
                html:'<h1>Hesabınız başarılı bir şekilde oluşturuldu</h1>'
            }

            transporter.sendMail(mailOptions, (err,data) =>{
                if(err) console.log(err)
                else console.log('Mail Gönderildi')
            })


         })
        .catch(err => {
            console.log(err.message)
        })

}

//______________________________________ Reset () ________________________
exports.getReset = (req,res) => {

    const errorMessage = req.session.errorMessage
    delete req.session.errorMessage

    res.render('account/reset-password', {
        my_title:'Reset Password Page',
        path:'/reset-password',
        errorMessage:errorMessage

    })
}

exports.postReset = (req,res) => {

        const email = req.body.email

        crypto.randomBytes(32, (err,buffer) => {
            if(err) {
                console.log(err)
                return res.redirect('/reset-password')
            }

            const token = buffer.toString('hex')

            User.findOne({email:email})
                .then(user => {
                    if(!user){
                        req.session.errorMessage ='Email adresi bulunamadı.'
                        req.session.save((err) => {
                            console.log(err)
                            return res.redirect('/reset-password')
                        })
                    }

                    user.resetToken = token
                    user.resetTokenExpiration = Date.now()+3600000

                    return user.save()
                }).then(result => {


                    res.redirect('/login')

                    let transporter= nodemailer.createTransport({
                        service:'gmail',
                        auth:{
                            user:'ugur.hmz52@gmail.com',
                            pass:process.env.EMAIL_PASS
                        }
                    })


                    let mailOptions = {
                        from:'ugur.hmz52@gmail.com',
                        to:`${email}`,
                        subject:'Parola Sıfırlama',
                        html:`
                        <p> Parolanızı güncellemek için aşağıdaki linke tıklayınız. </p>
                        <p>
                            <a href="http://localhost:3000/reset-password/${token}">
                            <strong>Reset password</strong>
                            </a> 
                        </p>
                        
                        `
                    }

                    transporter.sendMail(mailOptions, (err,data) =>{
                        if(err) console.log(err)
                        else console.log('Mail Gönderildi')
                    })

                })
                .catch(err => {
                    console.log(err)
                })

        })
}




//______________________________________ Password () ________________________
exports.getNewPassword =(req,res) => {


    const errorMessage = req.session.errorMessage
    delete req.session.errorMessage


    const token = req.params.token   //-> /reset-password/:token  burdaki token

    User.findOne( {
        resetToken:token,
        resetTokenExpiration : {
            $gt:Date.now()    //Şimdiki tarihten büyük bir tarih varmı
        }
     })    // Collection içindeki token da , yukardaki token  varmı
        .then(user => {
            res.render('account/new-password', {
                my_title:'New Password Page',
                path:'/new-password',
                errorMessage:errorMessage,
                userId: user._id.toString(),
                passwordToken :token

            })
        }).catch(err => {
            console.log(err)
    })
}


exports.postNewPassword =(req,res) => {

    const newPassword = req.body.password
    const userId = req.body.userId
    const token  = req.body.passwordToken
    let _user;

    User.findOne( {
        resetToken:token,
        resetTokenExpiration : {
            $gt:Date.now()    //Şimdiki tarihten büyük bir tarih varmı
        },
        _id:userId

    }).then(user => {
        _user = user
        return bcrypt.hash(newPassword,10)
    })
    .then(hashedPassword => {
        _user.password = hashedPassword
        _user.resetToken = undefined
        _user.resetTokenExpiration = undefined
        return _user.save()
    })
    .then(() => {
        res.redirect('/login')
    })
    .catch(err => {
        console.log(err)
    })


}


//______________________________________ getLogout () ________________________
exports.getLogout =(req,res) => {

        req.session.destroy(err => {
            console.log(err)
            res.redirect('/')
        })
}