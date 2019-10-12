/**
 * http://usejsdoc.org/
 */
const mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimt: 3,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
  });
  
var getCustomerDetails = function(custid, cb) {
		pool.getConnection(function(err,con) {
			if (err) {
				cb(err,null,null);
			}	
			else {
				con.query("SELECT * FROM customers where customerNumber=?",custid, cb);
				con.release();	
			}   
	  });
};

module.exports = {
		getCustomerDetails: getCustomerDetails
}