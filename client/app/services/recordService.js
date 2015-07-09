var db = require('../db');

function createRecord(company, data, callback){
    data.company = company;

    var record = new db.Record(data);

    record.save(callback);
}

function getRecord(company, recordId, callback){
    db.Record.findOne(
        {
            company: company,
            _id: recordId
        },
        callback
    );
}

function getRecordsByAccount(company, accountId, callback){
    db.Record.find(
        {
            company: company,
            accountId: accountId
        },
        callback
    );
}

function getRecordsByCompany(company, callback){
    db.Record.find(
        {
            company: company
        },
        callback
    );
}

function getByFormId(company, formId, callback){
    db.Record.find(
        {
            company: company,
            formId: formId
        },
        callback
    );
}

function updateRecord(company, recordId, data, callback){
    data.company = company;

    db.Record.update(
        {
            company: company,
            _id: recordId
        },
        data,
        function(error){
            callback(error);
        });
}

function deleteRecord(company, recordId, callback){
    db.Record.findOne(
        {
            company: company,
            _id: recordId
        }
    ).remove(function(error){
        callback(error);
    });
}

module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    getRecordsByAccount: getRecordsByAccount,
    getRecordsByCompany: getRecordsByCompany,
    getByFormId: getByFormId,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord
};