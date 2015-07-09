var db = require('../db');

function createPalette(company, data, callback){
    data.company = company;

    var palette = new db.Palette(data);

    palette.save(callback);
}

function getPalette(company, paletteId, callback){
    db.Palette.findOne(
        {
            company: company,
            _id: paletteId
        },
        callback
    );
}

function updatePalette(company, paletteId, data, callback){
    data.company = company;

    db.Palette.update(
        {
            company: company,
            _id: paletteId
        },
        data,
        function(error){
            callback(error);
        });
}

function deletePalette(company, paletteId, callback){
    db.Palette.findOne(
        {
            company: company,
            _id: paletteId
        }
    ).remove(function(error){
        callback(error);
    });
}

module.exports = {
    createPalette: createPalette,
    getPalette: getPalette,
    updatePalette: updatePalette,
    deletePalette: deletePalette
};