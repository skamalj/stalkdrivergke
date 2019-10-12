// Imports the Google Cloud client library
const monitoring = require('@google-cloud/monitoring');
const rp = require('request-promise');

//Vartiables to set labels for resource type 'gke_container
const projectId = process.env.PROJECT_ID;
const clustername = process.env.CLUSTER_NAME;
const podid = process.env.POD_ID;
const namespace = process.env.NAMESPACE;
//Zone is obtained from instance metadata ,while storing metric value
var zone = '';

//Servicename is used to define namespace for metric
const servicename = process.env.SERVICE_NAME;

const client = new monitoring.MetricServiceClient();

//This is request counter and is exported in this module.  Other modules can increment this variable.
//This value is then passed by routers/controllers to function storeMetric to capture its snapshot in time
var requests = 0;
var latencydatapoint = null;


//Request options to call metadata api from node to get zone
const options = {
    url: 'http://metadata.google.internal/computeMetadata/v1/instance/zone',
    headers: {
      'Metadata-Flavor': 'Google'
    }
  };

function storelatencydatapoints(time_now,latency) {
        var  dataPoint = {
            interval: { 
                endTime: {
                    seconds: time_now / 1000,
                },
            },
            value: {
                int64Value: latency,
            },
        }; 
	this.latencydatapoint  = dataPoint;
}

async function storeMetric(time_now,start_time,counter) {
//Get the zone value    
    await rp(options).then(function(data) {
        zone = data.split('/').pop();
      }).catch(function (err) {
        console.error(err);
      });
//For CUMMULATIVE metric both start and end time are required. Requirement is start time should be same for
//each metric data point. As these metrics are exposed as rate per sec, start time does not matter.
    const dataPoint = {
        interval: {
            startTime: {
                seconds: start_time,
            },  
            endTime: {
                seconds: time_now / 1000,
            },
        },
        value: {
            int64Value: counter,
        },
    }; 

 //Metric request object. Metric type is metric name and service name is used in the type to have
 //different namespace   
    const request = {
        name: client.projectPath(projectId),
        timeSeries: [{
            metric: {
                type: 'custom.googleapis.com/' + servicename + '/total_requests_new',
            },
            metricKind: 'CUMULATIVE',
            resource: {
                type: 'gke_container',
                labels: {
                    project_id: projectId,
                    cluster_name: clustername,
                    namespace_id: namespace,
                    pod_id: podid,
                    zone: zone,
                    container_name: "",
                    instance_id:  ""

                },
            },
            points: [dataPoint],
        },],
    };
 
//Store metric data point, if this is first data point metric descripter is created as well    
    client.createTimeSeries(request,(err => {    
    if(err) {	    
      console.error(err);
    }	 
    else {
      console.log("Current counter for project_id: "+projectId+" cluster: "+clustername+" zone: "+zone+" is: "+counter.toString());	     
    }	      
 }));
}

//This function sends latency metric to gcloud. metric is implemented as GUAGE.
async function storeLatencyMetric(latency) {
	if ( latency == null) {
		return ;
	}
    //Get the zone value    
        await rp(options).then(function(data) {
            zone = data.split('/').pop();
          }).catch(function (err) {
            console.log(err);
          });
    
     //Metric request object. Metric type is metric name and service name is used in the type to have
     //different namespace   
        const request = {
            name: client.projectPath(projectId),
            timeSeries: [{
                metric: {
                    type: 'custom.googleapis.com/' + servicename + '/request_latency',
                },
                metricKind: 'GUAGE',
                resource: {
                    type: 'gke_container',
                    labels: {
                        project_id: projectId,
                        cluster_name: clustername,
                        namespace_id: namespace,
                        pod_id: podid,
                        zone: zone,
                        container_name: "",
                        instance_id:  ""
    
                    },
                },
                points: [latency],
            },],
        };
     
    client.createTimeSeries(request,(err => {    
    if(err) {	    
      console.error(err);
    }	 
    else {	    
      console.log("Current latency for project_id: "+projectId+" cluster: "+clustername+" zone: "+zone+" is: "+latency.value["int64Value"].toString());	     
    }	      
 }));
}

module.exports = {
    requests: requests,
    storeMetric: storeMetric,
    storeLatencyMetric: storeLatencyMetric,	  
    storelatencydatapoints: storelatencydatapoints,
    latencydatapoint: latencydatapoint,	
}
