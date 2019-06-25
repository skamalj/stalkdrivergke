//List of ajax function which are called by application main page to change 
//chart and infopanel data

function loadCustomers(vueObj) {
	   axios.get("/loadCustomers").then(function(response){
		  vueObj.items= JSON.parse(JSON.stringify(response.data));
	   });
};	

