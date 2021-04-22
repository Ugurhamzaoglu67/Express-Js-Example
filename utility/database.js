require('dotenv').config()
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const my_pw = process.env.PASSWORD



const mongoConnect = (callback) => {
    MongoClient.connect(`mongodb+srv://craxx3131:${my_pw}@btkapp.in0gt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        .then(client => {
            console.log("Bağlantı başarılı...")

            callback(client)
        })
        .catch((err) => {
            console.log(err)
            throw err
        })


}

module.exports = mongoConnect