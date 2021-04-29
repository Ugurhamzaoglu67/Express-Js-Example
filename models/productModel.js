const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema  = new mongoose.Schema({
        name : {
            type:String,
            required:true,
            minlength:5,
            maxlength:255
        },
        price : {
            type : Number,
            required: function () {
                    return this.isActive //Oluşturulan nesnenin  aktif alanı true ise, fiyat alanını girmek zorunda
                }
            ,
            minlength:0,
            maxlength:50000
        },
        description : {
            type:String,
            minlength:200
        },
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

        category:{
            type: String,
            enum : ['telefon','Bilgisayar']
        },
        tags : {
          type :Array,
          valdiate: {
              validator : function(value) {
                  return value && value.length > 0;//Mutlaka değer olucak ve  > 0
              },
              message: "Ürün için en az 1 tane etiket giriniz"
          }
        },
        isActive : {
            type:Boolean
        }

    /*
        categories : [{
            type : Schema.Types.ObjectId,
            ref:'Category',
            required:true
        }]*/

})


module.exports = mongoose.model('Product', productSchema)
