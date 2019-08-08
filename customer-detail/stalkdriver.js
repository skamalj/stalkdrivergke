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

//Request options to call metadata api from node to get zone
const options = {
    url: 'http://metadata.google.internal/computeMetadata/v1/instance/zone',
    headers: {
      'Metadata-Flavor': 'Google'
    }
  };

async function storeMetric(time_now,counter) {
//Get the zone value    
    await rp(options).then(function(data) {
        zone = data.split('/').pop();
      }).catch(function (err) {
        console.log(err);
      });
//For CUMMULATIVE metric both start and end time are required. Requirement is start time should be same for
//each metric data point. As these metrics are exposed as rate per sec, start time does not matter.
    const dataPoint = {
        interval: {
            startTime: {
                seconds: new Date('July 1, 1999') / 1000,
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
                type: 'custom.googleapis.com/' + servicename + '/total_requests_cust_details',
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
    console.log(err) }));
};

module.exports = {
    requests: requests,
    storeMetric: storeMetric,
}
