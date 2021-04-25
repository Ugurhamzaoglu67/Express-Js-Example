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
                        ref:'Product',
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

userSchema.methods.addToCart = function (product) {
    const index = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString()
    });

    const updatedCartItems = [...this.cart.items];

    let itemQuantity = 1;
    if (index >= 0) {
        // cart zaten eklenmek istenen product var: quantity'i arttır
        itemQuantity = this.cart.items[index].quantity + 1;
        updatedCartItems[index].quantity = itemQuantity;

    } else {
        // updatedCartItems!a yeni bir eleman ekle
        updatedCartItems.push({
            productId: product._id,
            quantity: itemQuantity
        });
    }

    this.cart = {
        items: updatedCartItems
    }

    return this.save();
}





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
