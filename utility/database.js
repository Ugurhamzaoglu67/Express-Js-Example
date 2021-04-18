
const  mysql = require('mysql2')
require('dotenv').config()

let my_password = process.env.PASSWORD

const connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:my_password,
    database:'node-app'

})

module.exports = connection.promise()