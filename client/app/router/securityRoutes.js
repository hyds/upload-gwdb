var retorter = require('./retorter'),
    requestData = require('request-data'),
    wraperr = require('wraperr'),
    securityService = require('../services').securityService;

function login(retort, data){
    securityService.getAccount(
        data.accountId,
        data.password,
        wraperr(
            retort.ok,
            retort.error
        )
    );
}

function createAccount(retort, data){
    securityService.createAccount(
        data,
        wraperr(
            retort.ok,
            retort.error
        )
    );
}

module.exports = function(routes){
    routes['/login'] = {
        POST: requestData(retorter(login))
    };

    routes['/create'] = {
        POST: requestData(retorter(createAccount))
    };

    routes['/account'] = {
        GET: retorter(function(retort){
            retort.ok(retort.request.account);
        })
    };
};