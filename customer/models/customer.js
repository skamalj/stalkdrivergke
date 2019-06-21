/**
 * http://usejsdoc.org/
 */
const mysql = require('mysql');

var con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: 'incorrectpass',
	database: process.env.DB_NAME
  });
  
var getCustomers = function(cb) {
	con.connect(function(err) {
		if (err) throw err;
		con.query("SELECT customerName FROM customers limit 10", cb);
	  });
};

module.exports = {
		getCustomers: getCustomers
}