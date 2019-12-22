//custom module
var mysql = require('mysql'); //mysql module load
//mysql connection
module.exports = mysql.createConnection({
    host:'localhost',
    user:'board_user',
    password:'skkutest',
    database:'board_db'
});