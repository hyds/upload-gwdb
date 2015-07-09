var retorter = require('./retorter'),
    requestData = require('request-data'),
    wraperr = require('wraperr'),
    services = require('../services'),
    loginService = services.loginService;    
    // formService = services.formService,
    // recordService = services.recordService;

function createForm(retort, tokens, values, data){
    formService.createForm(
        tokens.company,
        data,
        wraperr(retort.ok, retort.error)
    );
}

function getForm(retort, tokens){
    formService.getForm(
        tokens.company,
        tokens.formId,
        wraperr(retort.ok, retort.error)
    );
}

function getForms(retort, tokens){
    formService.getForms(
        tokens.company,
        wraperr(retort.ok, retort.error)
    );
}

function updateForm(retort, tokens, values, data){
    formService.updateForm(
        tokens.company,
        tokens.formId,
        data,
        wraperr(retort.ok, retort.error)
    );
}

function deleteForm(retort, tokens){
    formService.deleteForm(
        tokens.company,
        tokens.formId,
        wraperr(retort.ok, retort.error)
    );
}

function getRecords(retort, tokens){
    recordService.getByFormId(
        tokens.company,
        tokens.formId,
        wraperr(retort.ok, retort.error)
    );
}

module.exports = function(routes){
    routes['/`login`/'] = {
        POST: requestData(retorter(login)),
        GET: retorter(loginForm)
    };

    // routes['/`company`/forms'] = {
    //     POST: requestData(retorter(createForm)),
    //     GET: retorter(getForms)
    // };

    // routes['/`company`/forms/`formId`'] = {
    //     GET: retorter(getForm),
    //     PUT: requestData(retorter(updateForm)),
    //     DELETE: retorter(deleteForm)
    // };

    // routes['/`company`/forms/`formId`/records'] = {
    //     GET: retorter(getRecords)
    // };
};