const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema  = new mongoose.Schema({
        name : {
            type:String,
            required:true
        },
        price : {
            type : Number,
            required:true
        },
        description : String,
        imageUrl : String,
        date : {
            type:Date,
            default : Date.now
        },
        userId : {
            type : Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        categories : {
            type : Schema.Types.ObjectId,
            ref:'Category',
            required:true
        }

})


module.exports = mongoose.model('Product', productSchema)
