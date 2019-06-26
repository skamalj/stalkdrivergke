
var populateCustomerList = function(req, res){
	var request = require('request');
	request('http://customer-ser:9000/getCustomers', function (error, response, body) {
      if (!error) {
		res.send(body);
	  }	
	  else {
		  console.log(error)
	  }
    });
}

var populateCustomerDetails = function(req, res){
	var request = require('request');
	request('http://customer-detail-ser:9000/getCustomerDetails/' + req.params.custid, function (error, response, body) {
      if (!error) {
		res.send(body);
	  }	
	  else {
		  console.log(error)
	  }
    });
}

module.exports = {
		populateCustomerList: populateCustomerList,
		populateCustomerDetails: populateCustomerDetails
}