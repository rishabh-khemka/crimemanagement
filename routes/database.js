var mysql      = require('mysql');
var connection = mysql.createConnection({
    	 host     : 'localhost',
  user     : 'rishabh',
  password : 'arkay',
  database : 'projectdb',
   socketPath: "/var/run/mysqld/mysqld.sock"
  });
 
 module.exports=connection;
