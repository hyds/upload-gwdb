var createRetorter = require('retort'),
    logger = require('../logger'),
    BaseError = require('../errors/baseError'),
    transformFunction = JSON.stringify;

function transformError(error){
    if(error instanceof Error){
        error = error.message;
    }
    return error;
}

module.exports = createRetorter({
    ok: function(request, response, data){
        response.statusCode = 200;
        response.end(transformFunction(data));
    },
    notFound: function(request, response, message){
        response.statusCode = 404;
        response.end(transformFunction(message || 'Not Found'));
    },
    badRequest: function(request, response, message){
        response.statusCode = 400;
        response.end(transformFunction(message || 'Bad Request'));
    },
    forbidden: function(request, response, message){
        response.statusCode = 403;
        response.end(transformFunction(message || 'Forbidden'));
    },
    unauthorised: function(request, response, message){
        response.statusCode = 401;
        response.end(transformFunction(message || 'Unauthorised'));
    },
    unprocessable: function(request, response, error){
        if(!error){
            error = 'Unprocessable Entity';
        }
        logger.error(error);
        response.statusCode = 422;
        response.end(transformFunction(transformError(error)));
    },
    error: function(request, response, error){
        if(!error){
            error = 'An unknown error occured';
        }

        logger.error(error);

        if(error instanceof BaseError){
            response.statusCode = error.code;
        }else if (BaseError.isYoikError(error) && error.code){
            response.statusCode = error.code;
            error = error.message;
        }else {
            response.statusCode = 500;
        }

        response.end(transformFunction(transformError(error)));
    },
    redirect: function(request, response, location){
        response.statusCode = 302;
        response.setHeader('Location', location);
        response.end();
    },
    noContent: function(request, response){
        response.statusCode = 204;
        response.end();
    },
    timeout: function(request, response){
        response.statusCode = 408;
        response.end();
    }
});