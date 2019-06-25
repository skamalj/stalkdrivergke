//Callback function to route - /getScrips
var details = require('../models/customerdetails.js');

var getCustomerDetails = function(req, res){
	details.getCustomerDetails(req.params.custid, function(err, data, fields) {
		if (err){
			console.log(err);
			res.status(500);
			res.send("Backend query failed - check console logs");
		}
		else {
		    res.send(data);
		}
	 })
};

module.exports = {
		getCustomerDetails: getCustomerDetails
}