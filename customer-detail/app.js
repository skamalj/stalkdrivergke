const express = require('express');

//Import stalkdriver routines
const stalkdriver = require('./stalkdriver.js');
var app = express();

app.use(function (req, res,next) {
    //Get request start time
    const startHrTime = Number(process.hrtime.bigint());
    res.on("finish", () => {
    //Calculate elapsedtime using the starttime and end in finish event
    //Pass the calculated latency to stalkdriver module for storing and sending to gcloud
       time = (Number(process.hrtime.bigint()) - startHrTime)/1000000.0
       stalkdriver.storelatencydatapoints(Date.now(),time) 
    });  
    next(); 
});

//Set routes
require("./routes/approutes.js")(app)

app.set('port', process.env.PORT || 9003);

app_start_time = Date.now()/1000;

//Metric are send to stalkdriver every 15 seconds. storeMetric is called using anonymoue function 
// to capture current  state of metric value, else it captures the state when 
// setInterval is first initiated and the metric value is always 0.
//Although these are called every 15secs, stackdriver has minimum granularity of 60secs.
setInterval(function() {stalkdriver.storeMetric(Date.now(),app_start_time,stalkdriver.requests)} , 15000 );
setInterval(function() {stalkdriver.storeLatencyMetric(stalkdriver.latencydatapoint)} , 15000 );

app.listen(app.get('port'), function() {
	console.info('Express started on http://localhost:' + app.get('port')
			+ '; press Ctrl-C to terminate.');
});



