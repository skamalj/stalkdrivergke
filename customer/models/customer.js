/**
 * http://usejsdoc.org/
 */
const mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimt: 10,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
  });
  
var getCustomers = function(cb) {
		pool.getConnection(function(err,con) {
			if (err) {
				cb(err,null,null);
			}	
			else {
				con.query("SELECT customerNumber,customerName FROM customers limit 10", cb);
				con.release();	
			}   
	  });
};

module.exports = {
		getCustomers: getCustomers
}