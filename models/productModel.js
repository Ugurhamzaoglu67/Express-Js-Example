
const products = []


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