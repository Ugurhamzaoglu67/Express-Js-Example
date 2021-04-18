const connection = require('../utility/database')

      //oneToMany

module.exports = class Product{

      constructor (name, price, imageUrl, description,categoryid) {

            this.name = name
            this.price = price
            this.imageUrl = imageUrl
            this.description = description
            this.categoryid = categoryid
      }

      saveProduct() {

      }

      //Nesne oluşturmadan, direk sınıf üzerinden bu şekilde ulaşabiliriz-> Product.getAll()
      static getAll() {
            return connection.execute('SELECT * FROM products')
      }


      static getById(id) {
           //Geriye tek bir ürün döndürüyor..

      }

      static getProductsByCategoryId(categoryid) {

//Bütün ürünleri categoryid alanlarına bakacak, bizim gönderdiğimizle eşleşen BÜTÜN  ürünleri Geriye gönder
      }

      static Update(product) {



      }

      static DeleteById(id) {

            //index'ten başla  1 TANE SİL


      }

}


