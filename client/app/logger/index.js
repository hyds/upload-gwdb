var config = require('../config'),
    bunyan = require('bunyan');

module.exports = bunyan.createLogger({
    name: config.serverName + ':v' + config.version,
    streams: [
        {
            level: config.logLevel,
            stream: process.stdout,
        },
        {
            level: config.logLevel,
            path: config.logFileName
        }
    ]
});
