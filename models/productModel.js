
const products = [
      {id:'12314',name:"Samsung S8",price:3500,imageUrl:'1-tel.jpg',description:'Güzel Tel',categoryid:"1"},
      {id:'56892',name:"Samsung S9",price:4500,imageUrl:'2-tel.jpg',description:'iyi Tel',categoryid:"1"},
      {id:'78921',name:"Samsung S10",price:5500,imageUrl:'1-tel.jpg',description:'İdare Tel',categoryid:"1"},
      {id:'45673',name:"Samsung S11",price:6500,imageUrl:'2-tel.jpg',description:'Hoş Tel',categoryid:"1"},
      {id:'21357',name:"Lenovo Computer",price:9500,imageUrl:'3-pc.PNG',description:'Harika PC',categoryid:"2"},
      {id:'21359',name:"Asus Computer",price:9500,imageUrl:'1-pc.PNG',description:'Süper Bilgisayar',categoryid:"2"},
      {id:'21312',name:"Arçelik Buzdolabı",price:9500,imageUrl:'1-buzdolabi.png',description:'Kaliteli buzdolap',categoryid:"3"},
      {id:'21321',name:"Vestel Buzdolabı",price:10500,imageUrl:'2-buzdolabi.png',description:'Kaliteli buzdolap',categoryid:"3"},
]
      //oneToMany

module.exports = class Product{

      constructor (name, price, imageUrl, description) {
            this.id = (Math.floor(Math.random()*9999)+1).toString()
            this.name = name
            this.price = price
            this.imageUrl = imageUrl
            this.description = description
      }

      saveProduct() {
            products.push(this)
      }

      //Nesne oluşturmadan, direk sınıf üzerinden bu şekilde ulaşabiliriz-> Product.getAll()
      static getAll() {
            return products
      }


      static getById(id) {
            return  products.find(i => i.id === id) //Geriye tek bir ürün döndürüyor..

      }

      static getProductsByCategoryId(categoryid) {
            return products.filter(i => i.categoryid === categoryid)
//Bütün ürünleri categoryid alanlarına bakacak, bizim gönderdiğimizle eşleşen BÜTÜN  ürünleri Geriye gönder
      }

      static Update(product) {
            const index = products.findIndex(i=> i.id === product.id)

            products[index].name = product.name
            products[index].price = product.price
            products[index].imageUrl = product.imageUrl
            products[index].description = product.description


      }

      static DeleteById(id) {

            const index =products.findIndex(i=> i.id === id)
            products.splice(index,1) //index'ten başla  1 TANE SİL


      }

}


