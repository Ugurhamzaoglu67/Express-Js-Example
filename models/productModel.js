const getDb = require('../utility/database.js').getDb

class Product {

      constructor(name, price, description, imageUrl) {
                  this.name = name
                  this.price = price
                  this.description = description
                  this.imageUrl = imageUrl
      }

      save() {
            const db = getDb()
            return db.collection('products')
                .insertOne(this)
                .then(result => {
                      console.log(result)
                })
                .catch(err => {
                      console.log(err)
                })

      }

      static findAll() {
          const db = getDb()
          return db.collection('products') //PROMISE GÖNDERMEYİ UNUTMA!!!!!! return
              .find()
              .toArray() //Bütün productsları çektik , diziye çevirdik. Dizide bize promise döndürüyor
              .then(products => {
                  return products
              })
              .catch((err) => {
                  console.log(err)
              })
      }

}

module.exports = Product