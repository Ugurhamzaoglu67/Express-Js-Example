module.exports.get404Page = (req,res) => {

      res.status(404).render('404',{
            my_title:'404 Not Found..',
            path:'404'
      })

}