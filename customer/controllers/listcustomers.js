//Callback function to route - /getScrips
var users = require('../models/customer.js');

var getCustomers = function(req, res){
	users.getCustomers(function(err, data, fields) {
		if (err){
			console.log(err);
			res.status(500);
		}
		else {
		    res.send(JSON.stringify(data))
		}
	 })
};

module.exports = {
		getCustomers: getCustomers
}