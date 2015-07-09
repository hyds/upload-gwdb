var db = require('../../persistence'),
    errors = require('generic-errors'),
    bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    kgo = require('kgo');

function getAccount(userName, callback){
    db.Account.findOne(
        {
            userName: userName,
            enabled: true
        },
        'id userName password',
        callback
    );
}

function createAccount(accountData, callback){
    kgo
    ({
        password: accountData.password,
        rounds: 12
    })
    ('passwordHash', ['password', 'rounds'], bcrypt.hash)
    (['passwordHash'], function(passwordHash){
        accountData.password = passwordHash;
        db.Account.create(accountData, callback);
    })
    .on('error', function(error){
        callback(error);
    });
}

function validatePassword(account, password, callback){
    if(!account || !account.password || !password){
        return callback(new errors.Unauthorised());
    }

    bcrypt.compare(password, account.password, function(error, result) {
        if(error || !result){
            return callback(new errors.Unauthorised());
        }

        callback();
    });
}

function generateToken(callback){
    crypto.randomBytes(16, function(error, token) {
        if (error || !token) {
            return callback(error || new Error('Problem when generating token'));
        }

        callback(null, token.toString('hex'));
    });
}

function updateToken(account, callback){
    kgo
    ({
        account: account
    })
    ('token', generateToken)
    ('saved', ['account', 'token'], function(account, token, done){
        var expiry = new Date();

        expiry.setDate(expiry.getDate() + 30);

        account.tokenExpiry = expiry;
        account.token = token;

        account.save(done);
    })
    (['token', '!saved'], callback.bind(null, null))
    .on('error', function(error){
        callback(error);
    });
}

function login(data, callback){
    kgo
    ({
        userName: data.userName,
        password: data.password
    })
    ('account', ['userName'], getAccount)
    ('valid', ['account', 'password'], validatePassword)
    ('token', ['account', '!valid'], updateToken)
    (['token'], function(token){
        callback(null, {token: token});
    })
    .on('error', function(error){
        callback(error);
    });
}

function validateToken(token, callback){
    db.Account.findOne(
        {
            token: token,
            tokenExpiry: {
                $gt: Date.now()
            },
            enabled: true
        },
        'id userName companyId',
        callback
    );
}

module.exports = {
    validateToken: validateToken,
    createAccount: createAccount,
    login: login
};