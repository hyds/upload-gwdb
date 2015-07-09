var db = require('../db');

function createForm(company, data, callback){
    data.company = company;

    var form = new db.Form(data);

    form.save(callback);
}

function getForm(company, formId, callback){
    db.Form.findOne(
        {
            company: company,
            _id: formId
        },
        callback
    );
}

function getForms(company, callback){
    db.Form.find(
        {
            company: company
        },
        callback
    );
}

function updateForm(company, formId, data, callback){
    data.company = company;

    db.Form.update(
        {
            company: company,
            _id: formId
        },
        data,
        function(error){
            callback(error);
        });
}

function deleteForm(company, formId, callback){
    db.Form.findOne(
        {
            company: company,
            _id: formId
        }
    ).remove(function(error){
        callback(error);
    });
}

module.exports = {
    createForm: createForm,
    getForm: getForm,
    getForms: getForms,
    updateForm: updateForm,
    deleteForm: deleteForm
};