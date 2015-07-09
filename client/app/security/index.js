var retorter = require('../router/retorter'),
    securityService = require('../services').securityService,
    wraperr = require('wraperr'),
    anonomousRoutes = ['/login', '/create'];

module.exports = function(callback){
    return function(request, response){
        if(~anonomousRoutes.indexOf(request.url)){
            return callback(request, response);
        }

        if(!request.headers || !request.headers.authentication){
            return retorter.unauthorised(request, response);
        }

        securityService.validateAccount(
            request.headers.authentication,
            wraperr(
                function(account){
                    if(
                        !account ||
                        !account.company ||
                        (
                            request.url.indexOf('/fields') !== 0 &&
                            request.url.indexOf('/' + account.company) !== 0 &&
                            request.url !== '/account'
                        )
                    ){
                        return retorter.forbidden(request, response);
                    }

                    request.account = account;
                    callback(request, response);
                },
                retorter.error.bind(request, response)
            )
        );
    };
};