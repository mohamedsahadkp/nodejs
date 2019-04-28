const winston = require('winston');
const CloudWatchTransport = require('winston-aws-cloudwatch');

const NODE_ENV = process.env.NODE_ENV || 'development';

const logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      colorize: true,
    })
  ]
});

var config = {
  logGroupName: 'my-log-group',
  logStreamName: NODE_ENV,
  createLogGroup: false,
  createLogStream: true,
  awsConfig: {
    accessKeyId: process.env.CLOUDWATCH_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  },
  formatLog: function (item) {
    return item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
  }
}

if (NODE_ENV != 'development') logger.add(CloudWatchTransport, config);

logger.level = process.env.LOG_LEVEL || "silly";

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};

module.exports = { logger };
