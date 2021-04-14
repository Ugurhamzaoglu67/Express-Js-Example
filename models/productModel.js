
const products = [
      {name:"Samsung S8",price:3500,imageUrl:'1-tel.jpg',description:'Güzel Tel'},
      {name:"Samsung S9",price:4500,imageUrl:'2-tel.jpg',description:'iyi Tel'},
      {name:"Samsung S10",price:5500,imageUrl:'1-tel.jpg',description:'İdare Tel'},
      {name:"Samsung S11",price:6500,imageUrl:'2-tel.jpg',description:'Hoş Tel'},
      {name:"Samsung S12",price:9500,imageUrl:'1-tel.jpg',description:'Harika Tel'},
]


module.exports = class Product{

      constructor (name, price, imageUrl, description) {
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

}