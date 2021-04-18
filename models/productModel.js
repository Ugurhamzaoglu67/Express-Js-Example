const Sequelize = require('sequelize')
const sequelize = require('../utility/database')


//Uygulamadaki model = Db tabloları

const Product = sequelize.define('product', {
      id: {
            type:Sequelize.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
      },
      name : Sequelize.STRING,
      price : {
            type: Sequelize.DOUBLE,
            allowNull:false
      },
      imageUrl : {
            type:Sequelize.STRING,
            allowNull:false
      },
      description: {
            type:Sequelize.STRING,
            allowNull:true
      }
})


module.exports = Product