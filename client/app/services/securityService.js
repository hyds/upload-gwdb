var db = require('../db'),
    errors = require('../errors'),
    bcrypt = require('bcrypt'),
    uuid = require('uuid');

function validateAccount(token, callback){
    db.Account.findOne(
        {
            token: token
        },
        callback
    );
}

function createAccount(data, callback){
    if(!data.company || !data.password){
        return callback(new errors.Unprocessable());
    }

    data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
    data.token = uuid.v4().replace(/-/g, '');

    var account = new db.Account(data);

    account.save(callback);
}

function getAccount(accountId, password, callback){
    db.Account.findOne(
        {
            _id: accountId
        },
        function(error, account){
            if(error){
                return callback(error);
            }

            if(!account || !bcrypt.compareSync(password, account.password)){
                return callback(new errors.Unauthorised());
            }

            callback(null, account);
        }
    );
}

module.exports = {
    validateAccount: validateAccount,
    createAccount: createAccount,
    getAccount: getAccount
};