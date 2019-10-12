//This code comes directly from logging-winston github page documentation
const winston = require('winston');
const {LoggingWinston} = require('@google-cloud/logging-winston'); 
const loggingWinston = new LoggingWinston();
// Create a Winston logger that streams to Stackdriver Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
const logger = winston.createLogger({
  transports: [loggingWinston,],
});

function logInfo(message,req,res) {
    if (req && res) { 
        logger.info(message, {
        httpRequest: {
            status: res.statusCode,
            requestUrl: req.url,
            requestMethod: req.method,
            remoteIp: req.connection.remoteAddress
        }
        });
    } else {
        logger.info(message);
    }    
}    

function logError(message,req,res) {
    if (req && res) { 
        logger.error(message, {
        httpRequest: {
            status: res.statusCode,
            requestUrl: req.url,
            requestMethod: req.method,
            remoteIp: req.connection.remoteAddress
        }
        });
    } else {
        logger.error(message);
    }    
}    

module.exports = {
		logInfo: logInfo,
        logError: logError
}