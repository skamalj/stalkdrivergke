var details = require('../models/customerdetails.js');
const stalkdriver = require('../stalkdriver.js');

var getMainPage = function(req, res){
	res.send('Hello from App Engine!');
};

var getCustomerDetails = function(req, res){
	details.getCustomerDetails(req.params.custid, function(err, data, fields) {
		if (err){
			console.log(err);
			res.status(500);
			res.send("Backend query failed - check console logs");
		}
		else {
			data[0]["Test"] = "Testing12345678";
			res.send(data);
//Increment request number on every call			
			++stalkdriver.requests	
		}
	 })
};

module.exports = {
		getCustomerDetails: getCustomerDetails,
		getMainPage: getMainPage
}
