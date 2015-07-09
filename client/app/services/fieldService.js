var db = require('../db');

function createField(data, callback){
    var field = new db.Field(data);

    field.save(callback);
}

function getField(fieldId, callback){
    db.Field.findOne(
        {
            _id: fieldId
        },
        callback
    );
}

function getFields(callback){
    db.Field.find({}, callback);
}

function updateField(fieldId, data, callback){
    db.Field.update(
        {
            _id: fieldId
        },
        data,
        function(error){
            callback(error);
        });
}

function deleteField(fieldId, callback){
    db.Field.findOne(
        {
            _id: fieldId
        }
    ).remove(function(error){
        callback(error);
    });
}

module.exports = {
    createField: createField,
    getField: getField,
    getFields: getFields,
    updateField: updateField,
    deleteField: deleteField
};