require('dotenv').config()
const Sequelize = require('sequelize')

const my_pw = process.env.PASSWORD

const sequelize = new Sequelize('node-app','root',my_pw,{
    host:'127.0.0.1',
    dialect:'mysql'
})

module.exports = sequelize


