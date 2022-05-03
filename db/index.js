const mysql = require('mysql')

const db = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'root',
  database:'api_server'
})
module.exports = db