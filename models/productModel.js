const getDb = require('../utility/database.js').getDb
const mongoDb =  require('mongodb')

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
              .project({description:0}) //Elimize description harici tüm olanları getir.
              .toArray() //Bütün productsları çektik , diziye çevirdik. Dizide bize promise döndürüyor
              .then(products => {
                  return products
              })
              .catch((err) => {
                  console.log(err)
              })
        }

      static findById(productid) {
          const db = getDb()
          // return db.collection('products').find({_id: new mongoDb.ObjectID(productid)}).toArray()
          //     .then((products) => {
          //         return products
          //     })
          //     .catch(err => {
          //         console.log(err)
          //     })

          //2. Yöntem
          return db.collection('products')
              .findOne({_id: new mongoDb.ObjectID(productid)})
              .then(product =>{
                  return product
              })
              .catch(err => {
                  console.log(err)
              })

      }



}

module.exports = Product