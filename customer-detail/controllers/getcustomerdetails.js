var details = require('../models/customerdetails.js');
const stalkdriver = require('../stalkdriver.js');
const logger = require('../winston.js')

var getMainPage = function(req, res){
	res.send('Hello from App Engine!');
};

var getCustomerDetails = function(req, res){
	details.getCustomerDetails(req.params.custid, function(err, data, fields) {
		if (err){
			res.status(500);
            logger.logError(err.code+" "+err.sqlMessage+"for custid:"+ req.params.custid,req,res);
			res.send("Backend query failed - check console logs");
		} else if (data.length == 0) {
			res.status(404);
            logger.logError("No Data returned for custid: "+ req.params.custid,req,res);
			res.send("No Data returned for custid: "+ req.params.custid);
        }
		else {
            res.status(200);
            logger.logInfo("Data fetched for custid: "+ req.params.custid,req,res);
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
