//Defines routes for the application linked to controllers/callback functions

var custlistctrl = require('../controllers/custListController.js');

module.exports = function(app){
	
app.get('/', function(req, res) {
	res.render('webapp');
});


app.get('/loadCustomers', custlistctrl.populateCustomerList);
app.get('/loadCustomerDetails/:custid', custlistctrl.populateCustomerDetais);

// 404 
app.use(function(req, res, next) {
	res.status(404);
	res.render('404');
});
// 500 
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

}