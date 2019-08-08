const express = require('express');

//Import stalkdriver routines
const stalkdriver = require('./stalkdriver.js');

var app = express();

//Set routes
require("./routes/approutes.js")(app)

app.set('port', process.env.PORT || 9003);

//Metric are send to stalkdriver every 15 seconds. storeMetric is called using anonymoue function 
// to capture current  state of metric value, else it captures the state when 
// setInterval is first initiated and the metric value is always 0.
setInterval(function() {stalkdriver.storeMetric(Date.now(),stalkdriver.requests)} , 15000 );

app.listen(app.get('port'), function() {
	console.info('Express started on http://localhost:' + app.get('port')
			+ '; press Ctrl-C to terminate.');
});



