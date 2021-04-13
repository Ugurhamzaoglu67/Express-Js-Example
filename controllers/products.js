
const products = [
      {
            name:'Samsung S8',
            price:3000,
            image:'galaxy-a71-gorseli-106161_large.jpg',
            description:'iyi Telefon...'
      },
      {
            name:'Lenovo',
            price:4000,
            image:'1-pc.PNG',
            description:'iyi Pc...'
      },
      {
            name:'Asus',
            price:5500,
            image:'2-pc.PNG',
            description:'Güzel Pc'
      },
      {
            name:'Samsung S11',
            price:7800,
            image:'samsung-galaxy-a50-akilli-telefon-941e.jpg',
            description:'iyi Telefon...'
      },
      {
            name:'LENOVO',
            price:7700,
            image:'3-pc.PNG',
            description:'Güzel Pc'
      }
]




exports.getProducts = (req,res,next) => {

      res.render('index', {
            my_title:'Hello Home Page',
            products:products,
            path:'/'
      
      })

}

exports.getAddProduct = (req,res,next) => {

      res.render('add-product',{
            my_title:'Ürün Ekleme Sayfası',
            path:'/admin/add-product'
       
       })
 
 }

 exports.postAddProduct = (req,res,next)=> {

      console.log(req.body)

      products.push({name:req.body.name, price:req.body.price, 
            image:req.body.image, 
            description:req.body.description
      })


      res.redirect('/')
}