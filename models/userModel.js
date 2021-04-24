const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
        name : {
            type:String,
            required:true
        },
        email : {
            type:String,
            required : true
        },
        cart : { //Kullanıcının Kart objesi
            items : [
                {
                    productId : {
                        type:mongoose.Schema.Types.ObjectId,
                        required :true
                    },
                    quantity : {
                        type : Number,
                        required : true
                    }
                }
            ]
        }
})

module.exports = mongoose.model('User', userSchema)





/*
const getDb = require('../utility/database').getDb
const mongoDb = require('mongodb')


class User {

        constructor(name, email) {
            this.name = name
            this.email = email
        }


        save () {
            const db = getDb()
            return db.collection('users').insertOne(this)

        }


        static findById(userid) {
                const  db = getDb()
                return db.collection('users').findOne({_id: new mongoDb.ObjectID(userid)})
                    .then( user => {
                        return user
                    })
                    .catch(err => {
                        console.log(err)
                    })
        }

        static findByName(username) {
            const  db = getDb()
            return db.collection('users').
            findOne({name : username})
                .then( user => {
                    return user
                })
                .catch(err => {
                    console.log(err)
                })
        }

}
*/

//module.exports = User
