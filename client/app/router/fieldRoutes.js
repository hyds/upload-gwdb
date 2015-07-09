var retorter = require('./retorter'),
    requestData = require('request-data'),
    wraperr = require('wraperr'),
    fieldService = require('../services').fieldService;

function getFields(retort){
    fieldService.getFields(
        wraperr(retort.ok, retort.error)
    );
}

function createField(retort, data){
    fieldService.createField(
        data,
        wraperr(retort.ok, retort.error)
    );
}

function getField(retort, tokens){
    fieldService.getField(
        tokens.fieldId,
        wraperr(retort.ok, retort.error)
    );
}

function updateField(retort, tokens, values, data){
    fieldService.updateField(
        tokens.fieldId,
        data,
        wraperr(retort.ok, retort.error)
    );
}

function deleteField(retort, tokens){
    fieldService.deleteField(
        tokens.fieldId,
        wraperr(retort.ok, retort.error)
    );
}

module.exports = function(routes){
    routes['/fields'] = {
        GET: retorter(getFields),
        POST: requestData(retorter(createField))
    };

    routes['/fields/`fieldId`'] = {
        GET: retorter(getField),
        PUT: requestData(retorter(updateField)),
        DELETE: retorter(deleteField)
    };
};