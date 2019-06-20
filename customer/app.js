const express = require('express');


var app = express();

app.get('/', (req, res) => {
	  res.send('Hello from App Engine!');
	});

require("./routes/approutes.js")(app)

app.set('port', process.env.PORT || 9000);
app.listen(app.get('port'), function() {
	console.info('Express started on http://localhost:' + app.get('port')
			+ '; press Ctrl-C to terminate.');
});



