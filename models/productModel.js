
const products = [
      {id:'12314',name:"Samsung S8",price:3500,imageUrl:'1-tel.jpg',description:'Güzel Tel'},
      {id:'56892',name:"Samsung S9",price:4500,imageUrl:'2-tel.jpg',description:'iyi Tel'},
      {id:'78921',name:"Samsung S10",price:5500,imageUrl:'1-tel.jpg',description:'İdare Tel'},
      {id:'45673',name:"Samsung S11",price:6500,imageUrl:'2-tel.jpg',description:'Hoş Tel'},
      {id:'21356',name:"Samsung S12",price:9500,imageUrl:'1-tel.jpg',description:'Harika Tel'},
]


module.exports = class Product{

      constructor (name, price, imageUrl, description) {
            this.id = Math.floor(Math.random()*9999)+1
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
            const product = products.find(i => i.id === id)
            return product
      }

}