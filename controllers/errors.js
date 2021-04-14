module.exports.get404Page = (req,res) => {

      res.status(404).render('../views/error/404.ejs',{
            my_title:'404 Not Found..',
            path:'404'
      })

}