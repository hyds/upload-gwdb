var retorter = require('./retorter'),
    requestData = require('request-data'),
    wraperr = require('wraperr'),
    recordService = require('../services').recordService;

function getRecordsByAccount(retort, tokens){
    recordService.getRecordsByAccount(
        tokens.company,
        retort.request.account.id,
        wraperr(retort.ok, retort.error)
    );
}

function getRecordsByCompany(retort, tokens){
    recordService.getRecordsByCompany(
        tokens.company,
        wraperr(retort.ok, retort.error)
    );
}

function createRecord(retort, tokens, values, data){
    recordService.createRecord(
        tokens.company,
        retort.request.account.id,
        data,
        wraperr(retort.ok, retort.error)
    );
}

function getRecord(retort, tokens){
    recordService.getRecord(
        tokens.company,
        retort.request.account.id,
        tokens.recordId,
        wraperr(retort.ok, retort.error)
    );
}

function updateRecord(retort, tokens, values, data){
    recordService.updateRecord(
        tokens.company,
        retort.request.account.id,
        tokens.recordId,
        data,
        wraperr(retort.ok, retort.error)
    );
}

function deleteRecord(retort, tokens){
    recordService.deleteRecord(
        tokens.company,
        retort.request.account.id,
        tokens.recordId,
        wraperr(retort.ok, retort.error)
    );
}

module.exports = function(routes){
    routes['/`company`/records'] = {
        GET: retorter(getRecordsByCompany),
        POST: requestData(retorter(createRecord))
    };

    routes['/`company`/records/byaccount'] = {
        GET: retorter(getRecordsByAccount)
    };

    routes['/`company`/records/`recordId`'] = {
        GET: retorter(getRecord),
        PUT: requestData(retorter(updateRecord)),
        DELETE: retorter(deleteRecord)
    };
};