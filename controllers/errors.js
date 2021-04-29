

exports.get404Page = (req,res) => {

      res.status(404).render('../views/error/404.ejs',{
            my_title:'404 Not Found..',
            path:'404',
            isAuthenticated:req.session.isAuthenticated,
            isAdmin:req.user.isAdmin
      })

}