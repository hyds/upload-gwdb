var BaseError = require('./baseError');

function ForbiddenError(){
    BaseError.apply(this, arguments);
}
ForbiddenError.prototype = Object.create(BaseError.prototype);
ForbiddenError.prototype.constructor = ForbiddenError;
ForbiddenError.prototype.code = 403;

module.exports = ForbiddenError;