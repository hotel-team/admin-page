const mysql = require('mysql2');
const dbConnection = mysql.createPool({
    host     : 'localhost', 
    user     : 'root',        
    password : '',    
    database : 'admin-panel'      
}).promise();
module.exports = dbConnection;