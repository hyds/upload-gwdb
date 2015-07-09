var retorter = require('./retorter'),
    requestData = require('request-data'),
    wraperr = require('wraperr'),
    paletteService = require('../services').paletteService;

function createPalette(retort, tokens, values, data){
    paletteService.createPalette(
        tokens.company,
        data,
        wraperr(retort.ok, retort.error)
    );
}

function getPalette(retort, tokens){
    paletteService.getPalette(
        tokens.company,
        tokens.paletteId,
        wraperr(retort.ok, retort.error)
    );
}

function updatePalette(retort, tokens, values, data){
    paletteService.updatePalette(
        tokens.company,
        tokens.paletteId,
        data,
        wraperr(retort.ok, retort.error)
    );
}

function deletePalette(retort, tokens){
    paletteService.deletePalette(
        tokens.company,
        tokens.paletteId,
        wraperr(retort.ok, retort.error)
    );
}

module.exports = function(routes){
    routes['/`company`/palettes'] = {
        POST: requestData(retorter(createPalette))
    };

    routes['/`company`/palettes/`paletteId`'] = {
        GET: retorter(getPalette),
        PUT: requestData(retorter(updatePalette)),
        DELETE: retorter(deletePalette)
    };
};