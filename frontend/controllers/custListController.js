
var populateCustomerList = function(req, res){
	request('customer-ser:9000', function (error, response, body) {
      if (!error) {
		res.send(data);
	  }	
    });
}

module.exports = {
		populateCustomerList: populateCustomerList
}