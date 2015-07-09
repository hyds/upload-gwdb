var http = require('http'),
    config = require('./config'),
    logger = require('./logger'),
    router = require('./router'),
    security = require('./security'),
    simpleCors = require('simple-cors'),
    port = config.port || 8080,
    server = http.createServer();

server.on('request', simpleCors(security(router)));

server.listen(port, function(error){
    if(error){
        logger.error(error);
        return process.exit(-1);
    }

    console.log('Listening on port: ' + port);
});
