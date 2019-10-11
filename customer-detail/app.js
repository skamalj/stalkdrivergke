const express = require('express');
var responseTime = require('response-time')

//Import stalkdriver routines
const stalkdriver = require('./stalkdriver.js');

var app = express();

app.use(responseTime(function (req, res, time) {
    stalkdriver.storeLatencyMetric(Date.now(),time) 
}));

//Set routes
require("./routes/approutes.js")(app)

app.set('port', process.env.PORT || 9003);

app_start_time = Date.now()/1000;

//Metric are send to stalkdriver every 15 seconds. storeMetric is called using anonymoue function 
// to capture current  state of metric value, else it captures the state when 
// setInterval is first initiated and the metric value is always 0.
setInterval(function() {stalkdriver.storeMetric(Date.now(),app_start_time,stalkdriver.requests)} , 15000 );

app.listen(app.get('port'), function() {
	console.info('Express started on http://localhost:' + app.get('port')
			+ '; press Ctrl-C to terminate.');
});



