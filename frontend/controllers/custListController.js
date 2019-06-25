
var populateCustomerList = function(req, res){
	var request = require('request');
	request('http://localhost:9000/loadCustomers', function (error, response, body) {
      if (!error) {
		res.send(body);
	  }	
	  else {
		  console.log(error)
	  }
    });
}

module.exports = {
		populateCustomerList: populateCustomerList
}